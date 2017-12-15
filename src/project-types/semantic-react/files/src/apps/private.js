import { Switch, Route } from 'react-router-dom'
import LoginPage from 'pages/LoginPage'
import PrivateHome from 'pages/PrivateHome'

export const AgencyApp = () => (
  <Switch>
    <Route path="/" component={PrivateHome} />
    <Route path="/sign-in" component={LoginPage} />
    <Route path="/sign-out" component={LoginPage} />
  </Switch>
)

export default AgencyApp
