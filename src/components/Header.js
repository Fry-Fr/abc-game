import React from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from './Nav';

const Header = () => {
    const navigate = useNavigate();
    return (
    <header>
        <div className="header-div">
            <h1 onClick={()=>navigate('/')}>Alphabet Game</h1>
        </div>
        <Nav />
    </header>
    )
}
export default Header;
