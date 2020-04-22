import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";

const reducers = {
    toastr: toastrReducer
  };
  const reducer = combineReducers(reducers);
  const store = createStore(reducer);

ReactDOM.render(<App store={store}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

