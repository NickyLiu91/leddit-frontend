import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux'
// import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import App from './App';
import rootReducer from './reducers/rootReducers'

// const rootReducer = combineReducers({ rootReducer: rootReducer})

const store = createStore(rootReducer)

ReactDOM.render(
   <Provider store={store}>
      <Router>
        {' '}
        <App />
      </Router>
   </Provider>,
   document.getElementById('root')
)

serviceWorker.unregister();
