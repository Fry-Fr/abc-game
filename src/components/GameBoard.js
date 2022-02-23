import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const GameBoard = () => {
    const [count, setCount] = useState(0);
    const [visited, setVistited] = useState([0])

    const { push } = useHistory();

    function reset(e) {
        e.preventDefault();
        const btn = e.target;
        if (btn.textContent === "last letter") {
            handleClick(e);
        }
        if (btn.textContent === "Reset") {
            push("/menu");
        }
    }

    useEffect(()=>{
        const div = document.querySelector('.gameboard');
        const btn = document.querySelector('button');
        
        if (visited.length >= 27) {
            div.textContent = "Game Over!";
            div.style.fontSize = "5rem";
            btn.textContent = "Reset";
            btn.id = 'reset-btn';
        }
        
        if (div.className === 'gameboard line-through'){
            return div.className = 'gameboard';
        }
        return div.className = 'gameboard'
    },[count, visited])

    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet = alphabet.toUpperCase();
    alphabet = alphabet.split('');


    const handleClick = (event) => {
        const div = document.querySelector(".gameboard");
        
        if (visited.length >= 26) {
            setVistited([...visited, count + 1])
            return
        }

        if (div.className === 'gameboard line-through'){
            return div.className = 'gameboard';
        }
        div.className = 'gameboard line-through';

        setTimeout(()=>{
            setVistited([ ...visited, count + 1 ]);
            setCount( count + 1 );
        },300)
    }

    return(
        <div className="game-board">
            <h1>GAMEBOARD</h1> 
            <div className="gameboard-wrapper">
            {visited.length <= 25
            ? <div className="gameboard" onClick={handleClick}>
                {alphabet[count]}
            </div>
            : <div className="gameboard" style={{cursor: "default"}}>
            {alphabet[count]}
            </div>}
            { visited.length >= 26 ? null : <><span>Click on the letter.</span>
            <span>Or</span> </> }
            { visited.length <= 25 ? <button onClick={handleClick}>next</button> : <button onClick={reset}>last letter</button>}
            </div>
        </div>
    )
}
export default GameBoard;