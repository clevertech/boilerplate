import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Books from './components/Books'

const Routes = (props) => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/books" component={Books} />
    <Route component={() => <p>404: page not found</p>} />
  </Switch>
)

export default Routes
