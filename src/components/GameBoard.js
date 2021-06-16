import React from 'react';

const GameBoard = () => {
    let alphabet = "abcdefghijklmnopqrstuvwxyz";
    alphabet = alphabet.split('');

    const handleLetterClick = (event) => {
        event.stopPropagation();
        console.log("clicked", event.target)
        let letter = event.target;
        if (letter.className === "letter line-through"){
            return letter.className = "letter";
        }
        return letter.className = "letter line-through"
    }
    return(
        <div className="game-board">
            <h1>GAMEBOARD</h1> 
            {alphabet.map((letter,i) => {
                return <div className="letter" key={i} onClick={handleLetterClick}>{letter.toUpperCase()}</div>
            })}
        </div>
    )
}
export default GameBoard;