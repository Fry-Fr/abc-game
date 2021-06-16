import { Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import GameBoard from './components/GameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route path="/" component={Header} />
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={LoginForm} />
      <Route exact path="/gameboard" component={GameBoard} />
    </div>
  );
}

export default App;
