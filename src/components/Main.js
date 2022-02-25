import React from 'react';

const Main = ({setName}) => {
    const handleNameClick = (e) => {
        e.stopPropagation();
        setName(prompt("What's your name"));
    }
    return (
        <section className="section-description">
            <p>
                On those boring highway commutes, there's no reason to feel bored. This app shall be here to assist you in playing the alphabet game. (Woo-Hoo).
                You will get access to special features specifically designed for the fun in this application.
                Compete against your friends and family. This app connects your game with other players actively participating.
            </p>
            <p>
                ** This application is not designed to be used by the driver of a vehicle. **
            </p>
            <button onClick={handleNameClick}>Enter name:</button>
        </section>
    )
}
export default Main;