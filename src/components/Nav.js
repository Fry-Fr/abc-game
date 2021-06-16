import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to="/login" className="nav-bar-link"><li>login</li></Link>
            </ul>
        </nav>
    )
}
export default Nav;
