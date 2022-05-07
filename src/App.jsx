import React from 'react';
import './App.css';
import ListContext from './ListContext';
import Header from './Header';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  return (
    <div className="app-wrapper">
      <Header/>
      <ListContext/>
    </div>
  );
}

export default App;
