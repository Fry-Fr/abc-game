import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import GameBoard from './components/GameBoard';
import Menu from './components/Menu';
import RandomBoard from './components/RandomGameBoard';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route index element={<Main/>} />
        <Route path="login" element={<LoginForm/>} />
        <Route path="menu" element={<Menu/>} />
        <Route path="alphabetical-board" element={<GameBoard/>} />
        <Route path="random-board" element={<RandomBoard/>} />
      </Routes>
    </div>
  );
}

export default App;
