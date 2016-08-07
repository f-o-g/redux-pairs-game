import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import Layout from './containers/Layout'
import Home from './containers/Home'
import Game from './containers/Game'
import CreateGame from './containers/CreateGame'

export default (store, history) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={Home}/>
          <Route path="create-game" component={CreateGame}/>
          <Route path="play" component={Game}/>
        </Route>
      </Router>
    </Provider>
  )
}
