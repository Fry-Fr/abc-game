import React from 'react';
import { useHistory } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
    const { push } = useHistory();
    return (
    <header>
        <div className="header-div">
            <h1 onClick={()=>push('/')}>Alphabet Game</h1>
        </div>
        <Nav />
    </header>
    )
}
export default Header;
