import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './actions/actions'
import "bootstrap/dist/css/bootstrap.min.css"

export const serverUrl = "http://localhost:7000"
const epicMiddleware = createEpicMiddleware()
const store = createStore(reducer, composeWithDevTools(applyMiddleware(epicMiddleware)))

epicMiddleware.run(rootEpic)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);