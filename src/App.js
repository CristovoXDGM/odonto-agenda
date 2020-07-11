import React from 'react';

import './App.css';

import Topbar from './components/Topbar';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <Topbar />
      <Routes />
    </div>
  );
}

export default App;
