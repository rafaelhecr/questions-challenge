import React from 'react';
// import PropTypes from 'prop-types';
import { Router, Switch, Redirect } from 'react-router-dom'
// import { HashRouter as Router, Switch} from 'react-router-dom';

// History
import { createBrowserHistory } from "history";

import QuestionsView               from './questions/actions/questions.router';
import MainLayout from '../layouts/main';


const history = createBrowserHistory()

//routes
class Routes extends React.Component {
  render() {
    return (
      <Router history={history} >
        <Switch>
          <Redirect  exact from="/" to="/questions" />
          <MainLayout exact path="/questions" component={QuestionsView} />
        </Switch>
      </Router>
    )
  }
}
export default Routes;