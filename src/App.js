import React from 'react'
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import store from './redux-saga/store';
import {HomeComponent, NotFoundComponent} from './components';
import './App.css';

function App() {
  return (
    <Provider store={store} >
    <Router>
        <Switch>
          <Route path="/" exact>
            <HomeComponent />
          </Route>
          <Route path="*" component={NotFoundComponent}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
