import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'

import reducers from '../reducers'
const reduxRouterMiddleware = routerMiddleware(browserHistory)
const middleware = [ reduxRouterMiddleware, thunk ]
const createStoreWithMiddleware = compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

export default initialState => createStoreWithMiddleware(reducers, initialState)