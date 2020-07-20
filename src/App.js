import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import Topbar from './components/Topbar';
import Routes from './routes';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Topbar />
          <Routes />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
