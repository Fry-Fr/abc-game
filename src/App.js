import { useState } from 'react';
import { Route } from 'react-router-dom';
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
      <Route path="/" component={Header} />
      <Route exact path="/" component={() => <Main setName={setName} /> } />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/menu" component={Menu} />
      <Route exact path="/alphabetical-board" component={() => <GameBoard name={name} />} />
      <Route exact path="/random-board" component={RandomBoard} />
    </div>
  );
}

export default App;
