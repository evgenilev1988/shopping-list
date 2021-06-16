import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import AddGrocery from '../AddGrocery/AddGrocery';
import GroceryCard from '../GroceryCard/GroceryCard';

import {Actions} from '../../store/actions/Actions';

import './ModifyGroceries.css';

const ModifyGroceries = ()=>{
    const items = useSelector((state) => state.items);
    const dispatch = useDispatch();

    useEffect(()=>{
        // initiallize the history list;
        if(items.length === 0)
            dispatch({type:Actions.INIT});
    },[]);

    const onRemoveItem = (index)=>{
        dispatch({type:Actions.REMOVEGROCERY,itemId:index});
    }

    const onAddItemSubmit = (itemData)=>{
        dispatch({type:Actions.ADDGROCERY,itemData});
    }

    return (
        <div className="modify-list">
            <h1>SHOPPING LIST</h1>
            <AddGrocery onAddItemSubmit={(itemData) => onAddItemSubmit(itemData)}/>
            <ul className="grocery-list">
                {items.map((item,index) => 
                    (<li key={index} >
                        <GroceryCard item={item} onRemoveItem={()=>onRemoveItem(index)}/>
                    </li>)
                )}
            </ul>
        </div>
    );

}

export default ModifyGroceries;