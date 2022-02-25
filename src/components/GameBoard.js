import React, {useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { io } from "socket.io-client";

const socket = io("localhost:3333");
socket.on("connect", () => {});
socket.on("disconnect", () => {});

const GameBoard = ({ name }) => {
    const [count, setCount] = useState(0);
    const [visited, setVistited] = useState([0]);
    const [clients, setClients] = useState({});

    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet = alphabet.toUpperCase();
    alphabet = alphabet.split('');

    const { push } = useHistory();

    useEffect(() => {
        if (alphabet[count] !== clients[name]) {
            socket.emit("setClient", {name: name, letter: alphabet[count]})
        }
        socket.on("clientList", (list) => {
            setClients(list)
        })
    },[alphabet, count, name, clients])

    function reset(e) {
        e.preventDefault();
        const btn = e.target;
        if (btn.textContent === "last letter") {
            socket.emit('forceDisconnect');
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
        <>
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
        <div style={{'color':'black', 'textAlign':'center'}}>
            {Object.keys(clients).map(name => {
                return (
                    <p key={name}>{name + ' --> ' + clients[name]}</p>
                )
            })}
        </div>
        </>
    )
}
export default GameBoard;