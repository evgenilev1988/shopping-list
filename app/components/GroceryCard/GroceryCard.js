import React from 'react';
import PropTypes from 'prop-types';

import './GroceryCard.css';
import '../common/common.css';

import {formatDate} from '../GroceryList/GroceryList';

import Dairy from '../../images/dairy.jpeg';

const GroceryCard = (props) => {
    const {index, item} = props;

    const onRemoveItem = () => {
        props.onRemoveItem(index);
    }

    return (
        <div className="card">
            <h1>{item.productName}</h1>
            <p className="store grey">{item.store}</p>
            <div>Last Purchased:</div>
            <div className="last-purchased grey">{formatDate(item.timeOfPurchase)}</div>
            <p>
                <button type="button" onClick={()=>onRemoveItem()}>REMOVE</button>
            </p>
        </div>
    )
}

GroceryCard.propTypes = {
    item:PropTypes.object.isRequired,
    onRemoveItem:PropTypes.func.isRequired
}

export default GroceryCard;