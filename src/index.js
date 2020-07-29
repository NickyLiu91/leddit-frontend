import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import App from './App';
import usersReducer from './reducers/usersReducer'

const rootReducer = combineReducers({ usersReducer: usersReducer})

const store = rootReducer

console.log(store.getState())

ReactDOM.render(
   <Provider store={store}>
      <Router>
        <App />
      </Router>
   </Provider>,
   document.getElementById('root')
)

serviceWorker.unregister();
