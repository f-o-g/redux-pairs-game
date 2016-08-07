import React from 'react'
import ReactDOM from 'react-dom'
import AppRouter from './AppRouter'
import configureStore from './store/createStore'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const app = document.createElement('div')
document.body.appendChild(app)

ReactDOM.render(
  AppRouter(store, history),
  app
)
