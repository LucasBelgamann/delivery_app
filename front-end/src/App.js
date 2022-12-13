import React from 'react';
import './App.css';
import Routes from './routes/routes';
import ThisProvider from './context/Provider';

function App() {
  return (
    <ThisProvider>
      <Routes />
    </ThisProvider>
  );
}

export default App;
