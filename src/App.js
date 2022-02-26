import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import GameBoard from './components/GameBoard';
import Menu from './components/Menu';
import RandomBoard from './components/RandomGameBoard';
import './App.css';

function App() {
  const [name, setName] = useState('');
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route index element={<Main name={name} setName={setName}/>} />
        <Route path="login" element={<LoginForm/>} />
        <Route path="menu" element={<Menu/>} />
        <Route path="alphabetical-board" element={<GameBoard name={name}/>} />
        <Route path="random-board" element={<RandomBoard/>} />
      </Routes>
    </div>
  );
}

export default App;
