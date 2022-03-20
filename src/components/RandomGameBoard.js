import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux';
import { Table, Button } from 'reactstrap';
import { socket } from '../utils/socket';

const RandomBoard = (props) => {
    const [visited, setVistited] = useState([]);
    const [count, setCount] = useState(() => randomize());
    const [clients, setClients] = useState({});
    
    let alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet = alphabet.toUpperCase();
    alphabet = alphabet.split('');

    const navigate = useNavigate();

    useEffect(() => {
        if (socket.connected === false && props.online === true) {
            socket.connect();
        }
        return () => socket.disconnect();
    },[props.online])

    useEffect(() => {
        if (props.online === true) {
            socket.on("connect", () => {
                socket.on("clientList", (list) => {
                    setClients(list)
                })
            });
            if (alphabet[count] !== clients[props.player]) {
                socket.emit("setClient", {name: props.player, letter: alphabet[count]})
            }
            socket.on("clientList", (list) => {
                setClients(list)
            })
        }
    },[props.online, alphabet, count, props.player, clients])

    const reset = (e) => {
        e.preventDefault();
        const btn = e.target;
        if (btn.textContent === "last letter") {
            socket.disconnect();
            handleRandomClick(e);
        }
        if (btn.textContent === "Reset") {
            navigate("/menu", { replace:true });
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



    function randomize() {
        if (visited.length !== 26 && visited.length !== 0) {
            while (true) {
                const randNum = Math.floor(Math.random() * 26);
                if (visited.includes(randNum)) {
                    continue
                }else {
                    setVistited([...visited, randNum])
                    return randNum;
                };
            };
        }else {
            const initRandNum = Math.floor(Math.random() * 26);
            setVistited([...visited, initRandNum]);
            return initRandNum;
        }
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
        <>
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
            { visited.length >= 26 ? null : <><span>Remaining letters:</span>
            <span>{26 - visited.length}</span></> }
            { visited.length <= 25 ? <Button color="primary" onClick={handleRandomClick}>next</Button> : <Button color="success" onClick={reset}>last letter</Button>}
            </div>
        </div>
        {!props.online ? undefined :
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
        </div>}
        </>
    )
}

const mapToProps = (state) => {
    return({
        player: state.player,
        online: state.online
    })
}
export default connect(mapToProps) (RandomBoard);