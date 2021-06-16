import {Actions} from '../actions/Actions';
import purchase from '../../mock/mockdata.json';


const initialState = {
    items: []
}

const init = (state, action) => {
  return {
      ...state,
      items: state.items.concat(purchase.purchaseHistory).sort((a,b)=>{
        return new Date(b.timeOfPurchase) - new Date(a.timeOfPurchase) 
      })
  };
}


const addItem = (state, action) => {
  debugger;
    const item = {
      "timeOfPurchase":new Date().toISOString(),
      "productName":action.itemData.product,
      "store":action.itemData.store
  };

  return {
      ...state,
      items: state.items.concat(item).sort((a,b)=>{
        return new Date(b.timeOfPurchase) - new Date(a.timeOfPurchase) 
      })
  };
}

const removeItem = (state, action) => {
  return {
      ...state,
      items: state.items.filter((item,index) => action.itemId !== index)
  };
}


const GroceriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case Actions.INIT: return init(state, action);
        case Actions.ADDGROCERY: return addItem(state, action);
        case Actions.REMOVEGROCERY: return removeItem(state, action);
        default: return state;
    }
}

export default GroceriesReducer;