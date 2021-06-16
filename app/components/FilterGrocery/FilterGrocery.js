import React,{useState} from 'react';
import PropTypes from 'prop-types';
import {Stores} from '../../helpers/Stores';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import './FilterGrocery.css';
import '../common/common.css';

const FilterGrocery = (props) => {
    const [product,setProduct] = useState('');
    const [store,setStore] = useState(Object.keys(Stores)[0]);
    const [date, setDate] = useState(null);

    const onFilterClick = (data) => {
        props.onFilterClick(data);
        if(data === null){
            setProduct('');
            setStore(Object.keys(Stores)[0]);
            setDate(null);
        }
    }

    return (
        <div className='grocery-search-filter-section filter-grocery'>
            <span className="filter-text">Product name: </span>
            <input id="product" value={product} onChange={(event) => setProduct(event.target.value)}/>
            <span className="filter-text">Store:</span>
            <select value={store} onChange={event => setStore(event.target.value)}>
                {Object.keys(Stores).map((store,index) => <option key={index} value={store}>{store}</option>)}
            </select>
            <span className="filter-text">Get Product From:</span>
            <DatePicker selected={date} onChange={(date) => setDate(date)} />
            <div className="filter-buttons">
                <button onClick={() => onFilterClick({product,store,date})}>Filter</button> 
                <button onClick={() => onFilterClick(null)}>Clear</button>
            </div>
        </div>
    )
};

FilterGrocery.propTypes = {
    onFilterClick:PropTypes.func.isRequired
}

export default FilterGrocery;