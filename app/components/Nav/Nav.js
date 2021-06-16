import React from 'react';
import {NavLink} from 'react-router-dom';

import './Nav.css';

const activeStyle = {
    color: 'rgb(187, 46, 31)'
  }

const Nav = ()=>{
    return (
        <nav>
            <NavLink activeStyle={activeStyle}  
                exact
                to='/'>Home
            </NavLink>
            <NavLink activeStyle={activeStyle}  
                exact
                to='/shopping-history'>Shopping History
            </NavLink>
            <NavLink 
                exact
                activeStyle={activeStyle} 
                to='/modify-groceries'>Shopping List
            </NavLink>        
        </nav>      
)
}

export default Nav;
