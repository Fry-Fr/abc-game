import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav>
            <ul>
                <Link to="/menu" className="nav-bar-link"><li>Play!</li></Link>
            </ul>
        </nav>
    )
}
export default Nav;
