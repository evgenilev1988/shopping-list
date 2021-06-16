import React, { useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { DataGrid, gridColumnsTotalWidthSelector } from '@material-ui/data-grid';
import FilterGrocery from '../FilterGrocery/FilterGrocery';

import {Actions} from '../../store/actions/Actions';
import {Stores} from '../../helpers/Stores';

import './GroceryList.css';

export const formatDate = (timeOfPurchase) => {
    var date = new Date(timeOfPurchase); 

    var day = date.toLocaleDateString('en-us', { weekday: 'long' });
    var month = date.toLocaleDateString('en-us', { month: 'long' });
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    
    var suffix = ''
    if (date.getDate() > 3 && date.getDate() < 21) suffix = "th";
        
    switch (date.getDate() % 10) {
        case 1:  suffix = "st";
        case 2:  suffix =  "nd";
        case 3:  suffix = "rd";
        default: suffix = "th";
    }

    return `${day}, ${month} ${date.getDate()}${suffix}, ${date.getFullYear()}, ${hours}:${minutes}`
}

const columns = [
    { field: 'time', headerName: 'Time', width: 500,
        renderCell: (params) => {
            return formatDate(params.value);
        } 
    },
    { field: 'product', headerName: 'Product Name', width: 500 },
    { field: 'store', headerName: 'Store', width: 500,
        renderCell: (params) => {
            return (
                <a href={Stores[params.value]} target="_blank">{params.value}</a>
            );
        }
    }        
];

const mergeProductLists = (filteredData) => {
    return filteredData.reduce((state,item)=>{
        if(state[item.timeOfPurchase+ item.store]){
            state[item.timeOfPurchase+ item.store].products.push(item.productName)
        }else{
            state[item.timeOfPurchase+ item.store] = {
                ...item,
                products:[item.productName]
            };
        }
        return state;
    },{});
}

const rearrangeProducts = (mergeProducts) => {
    return Object.keys(mergeProducts).map((key)=>{
        const {timeOfPurchase,store,products} = mergeProducts[key];
        return {
            time: timeOfPurchase,
            store,
            products
        }})
        .map((item,index) => {
            const {time,products,store} = item;
            return {
                id:index,
                time,
                product: products.join(', '),
                store
            }
    });
}

const filterItems = (gridData,filterBy) => {
    if(gridData.length === 0)
        return [];

     // Filter the products based on the store, name, date   
     const filteredData = gridData.filter((data)=>{
        const prductName = filterBy && filterBy.product !== '' ? data.productName.toLocaleLowerCase().indexOf(filterBy.product.toLocaleLowerCase()) !== -1 : true;
        const store = filterBy !== null ? filterBy.store === data.store : true;
        const date = filterBy && filterBy.date ? new Date(data.time) > new Date(filterBy.date) : true;
        return prductName && store && date; 
    });

    // Create an object in order to group the items in one line
    const mergeProducts = mergeProductLists(filteredData);
    
    // Return array in order to be able to use it in the data grid
    return rearrangeProducts(mergeProducts);
};


const GroceryList = () => {
    const items = useSelector((state) => state.items);
    const [filterBy, setFilterBy] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        // initiallize the history list;
        if(items.length === 0)
            dispatch({type:Actions.INIT});
    },[]);

    const onFilterClick = (data) => {
        setFilterBy(data);
    }

    return (
        <div>
            <h1>Shopping History</h1>
            <FilterGrocery onFilterClick={(data)=> onFilterClick(data)}/>
            <div style={{ height: 500, width: '100%', marginTop:'10px' }}>
                <DataGrid rows={filterItems(items,filterBy)} columns={columns} pageSize={15} disableSelectionOnClick hideFooter={false}/>
            </div>
        </div>
    )
}

export default GroceryList;