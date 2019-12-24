import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MembersPage } from './components/pages'
import { useAuthState } from './services'

const App = () => {
  useAuthState()

  return (
    <Router>
      <div>
        <CssBaseline />
        <Switch>
          <Route exact path={['/members', '/']} component={MembersPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
