import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const RandomBoard = () => {
    const [count, setCount] = useState(0);
    const [visited, setVistited] = useState([0])

    const { push } = useHistory();

    const reset = (e) => {
        e.preventDefault();
        const btn = e.target;
        if (btn.textContent === "last letter") {
            handleRandomClick(e);
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


    function randomize() {
        if (visited.length !== 26) {
            while (true) {
                const randNum = Math.floor(Math.random() * 26);
                if (visited.includes(randNum)) {
                    continue
                }else {
                    setVistited([...visited, randNum])
                    return randNum;
                };
            };
        };
    };

    const handleRandomClick = (event) => {
        event.preventDefault();
        const div = document.querySelector('.gameboard')

        if (div.className === 'gameboard line-through'){
            return div.className = 'gameboard';
        }
        div.className = 'gameboard line-through';

        if (visited.length >= 26) {
            setVistited([...visited, count + 1])
            return
        }

        setTimeout(()=>{
            setCount(randomize());
        },300)
    }

    return(
        <div className="game-board">
            <h1>GAMEBOARD</h1>
            <div className="gameboard-wrapper">
            {visited.length <= 25
            ? <div className="gameboard" onClick={handleRandomClick}>
                {alphabet[count]}
            </div>
            : <div className="gameboard" style={{cursor: "default"}}>
            {alphabet[count]}
            </div>}
            { visited.length >= 26 ? null : <><span>Click on the letter.</span>
            <span>Or</span> </> }
            { visited.length <= 25 ? <button onClick={handleRandomClick}>next</button> : <button onClick={reset}>last letter</button>}
            </div>
        </div>
    )
}
export default RandomBoard;