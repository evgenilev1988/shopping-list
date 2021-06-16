import React from 'react';
import ReactDom from 'react-dom';

import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import GroceriesReducer  from './store/reducers/GroceriesReducer';

import Nav from './components/Nav/Nav';
import Landing from './components/Landing/Landing';
import GroceryList from './components/GroceryList/GroceryList';
import ModifyGroceries from './components/ModifyGroceries/ModifyGroceries';

const store = createStore(GroceriesReducer);

const app = (
    <Router>
        <Provider store={store}>
            <div>
                <Nav/>
                <Switch>
                    <Route exact path="/shopping-history" component={GroceryList}/>
                    <Route exact path="/modify-groceries" component={ModifyGroceries}/>
                    <Route component={Landing}/>
                </Switch>
            </div>
        </Provider>
    </Router>
);


ReactDom.render(app,document.getElementById('app'));
