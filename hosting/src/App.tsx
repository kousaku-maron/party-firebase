import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomePage, TermsPage, PrivacyPage, TermsWebviewPage, PrivacyWebviewPage } from './components/pages'

const App = () => (
  <Router>
    <div>
      <Switch>
        <Route exact path={['/home', '/']} component={HomePage} />
        <Route path="/terms" component={TermsPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route exact path="/webview-terms" component={TermsWebviewPage} />
        <Route exact path="/webview-privacy" component={PrivacyWebviewPage} />
      </Switch>
    </div>
  </Router>
)

export default App
