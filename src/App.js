import React from 'react';
import { Provider } from 'react-redux';

import './App.css';

import Topbar from './components/Topbar';
import Routes from './routes';

import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Topbar />
        <Routes />
      </div>
    </Provider>
  );
}

export default App;
