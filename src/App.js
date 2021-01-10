import React from 'react'
import { Provider } from 'react-redux';

import store from './redux-saga/store';
import ListComponent from './components/ListComponent';
import Header from './components/header';
import './App.css';

function App() {
  return (
    <Provider store={store} >
      <div className="App">
        <Header />
        <ListComponent />
      </div>
    </Provider>
  );
}

export default App;
