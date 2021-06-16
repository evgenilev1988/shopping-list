import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Stores} from '../../helpers/Stores';

import '../common/common.css';

const AddGrocery = (props)=>
{
    const [product,setProduct] = useState('');
    const [store,setStore] = useState(Object.keys(Stores)[0]);

    const onAddProduct = () => {
        props.onAddItemSubmit({product,store});
        setProduct('');
    }

    return (
        <div className="grocery-search-filter-section">
            <span className="filter-text">Product name:</span>
            <input type="text" value={product} onChange={event => setProduct(event.target.value)}></input> 
            <span className="filter-text">Store:</span>
            <select onChange={event => setStore(event.target.value)}>
                {Object.keys(Stores).map((store,index) => <option key={index} value={store}>{store}</option>)}
            </select>
            <button onClick={() => onAddProduct()}>Add Product</button>
        </div>
    );
}

AddGrocery.propTypes = {
    onAddItemSubmit:PropTypes.func.isRequired
}

export default AddGrocery;