import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Home = () => (
  <div>
    <h1>home</h1>
  </div>
)

const Term = () => (
  <div>
    <h1>term</h1>
  </div>
)

const Policy = () => (
  <div>
    <h1>policy</h1>
  </div>
)

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path={['/home', '/']} component={Home} />
        <Route path="/term" component={Term} />
        <Route path="/policy" component={Policy} />
      </Switch>
    </div>
  </Router>
)

export default App
