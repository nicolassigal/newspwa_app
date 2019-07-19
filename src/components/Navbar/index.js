import React from 'react';
import { NavLink } from 'react-router-dom';
import NightMode from '../NightMode';

const Navbar = (props) => {
    return (
        <nav className="navbar">
        <div id="menuToggle">
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul id="menu">
                <NavLink exact={true} activeClassName="active" to="/">Home</NavLink>
                {
                    props.categories.map((category, i) => (
                        <NavLink 
                        key={i}
                        activeClassName="active"
                        to={{pathname: `/categories/${category}`, query: { category }}}>
                        {category}
                        </NavLink>
                    ))
                }
            </ul>
            </div>
            <div className="brand">
                <h1>News</h1>
            </div>
            <NightMode />
        </nav>
    )
}

export default Navbar;