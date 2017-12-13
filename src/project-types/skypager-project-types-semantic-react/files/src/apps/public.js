import { Switch, Route } from 'react-router-dom'
import LoginPage from 'pages/LoginPage'
import PublicHome from 'pages/PublicHome'
import AboutUs from 'pages/AboutUs'
import ContactUs from 'pages/ContactUs'
import FrequentlyAskedQuestions from 'pages/FrequentlyAskedQuestions'
import PrivacyPolicy from 'pages/PrivacyPolicy'
import TermsOfUse from 'pages/TermsOfUse'

export const PublicApp = () => (
  <Switch>
    <Route path="/" exact component={PublicHome} />
    <Route path="/about-us" exact component={AboutUs} />
    <Route path="/contact" exact component={ContactUs} />
    <Route path="/faq" exact component={FrequentlyAskedQuestions} />
    <Route path="/privacy" exact component={PrivacyPolicy} />
    <Route path="/terms-of-use" exact component={TermsOfUse} />
    <Route path="/sign-in" component={LoginPage} />
    <Route path="/sign-out" component={LoginPage} />
  </Switch>
)

export default PublicApp
