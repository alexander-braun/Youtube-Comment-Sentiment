import 'react-app-polyfill/ie9'
import 'react-app-polyfill/stable'
import "core-js/stable"

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { Provider } from 'react-redux'
import './styles/main.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
