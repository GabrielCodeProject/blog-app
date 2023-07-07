import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginPage from './components/loginComponents/loginPage';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage />
        <button><a href='http://localhost:5000/api'>API redirect</a></button>
      </header>
    </div >
  );
}

export default App;
