import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import MembersPage from './components/pages/MembersPage'
import LoadingPage from './components/pages/LoadingPage'
import { useAuthState } from './services'

const App = () => {
  const { uid } = useAuthState()

  if (!uid) {
    return <LoadingPage />
  }

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
