import {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'reactstrap';
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_URL || "localhost:3333");
socket.on("connect", () => console.log("connected"));
socket.on("disconnect", () => console.log("disconnected"));

const GameBoard = ({ name }) => {
    const [count, setCount] = useState(0);
    const [visited, setVistited] = useState([0]);
    const [clients, setClients] = useState({});
    
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet = alphabet.toUpperCase();
    alphabet = alphabet.split('');
    
    const navigate = useNavigate();

    useEffect(() => {
        if (socket.connected === false) {
            socket.connect();
            return () => socket.disconnect();
        }
        return () => socket.disconnect();
    },[])

    useEffect(() => {
        socket.on("connect", () => {
            socket.on("clientList", (list) => {
                setClients(list)
            })
        });
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
            socket.disconnect();
            handleClick(e);
        }
        if (btn.textContent === "Reset") {
            navigate("/menu");
        }
    }

    useEffect(()=>{
        const div = document.querySelector('.gameboard');
        const btn = document.querySelector('.btn');
        
        if (visited.length >= 27) {
            div.textContent = "Game Over!";
            div.style.fontSize = "5rem";
            btn.textContent = "Reset";
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
            { visited.length <= 25 ? <Button color='danger' onClick={handleClick}>next</Button> : <Button color='success' onClick={reset}>last letter</Button>}
            </div>
        </div>
        <div style={{'color':'black', 'textAlign':'center'}}>
            <Table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>letter</th>
                    </tr>
                </thead>
                <tbody>
                {Object.keys(clients).map((name,i) => {
                    return (
                        <tr key={name}>
                            <td>{name}</td>
                            <td>{clients[name]}</td>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
        </>
    )
}
export default GameBoard;