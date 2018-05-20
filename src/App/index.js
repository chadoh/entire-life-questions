import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import SigningIn from './SigningIn'
import ScrollToTop from './ScrollToTop'
import Home from './Home'
import Question from './Question'
import * as Help from './Help'

import './App.css';

class App extends Component {

  render() {
    return <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/help/question-sets" component={Help.QuestionSets} />
          <Route exact path="/help/templates" component={Help.Templates} />
          <Route exact path="/signing-in" render={props =>
            <SigningIn {...props} />
          } />
          <Route path="/:id" component={Question} />
        </Switch>
      </ScrollToTop>
    </Router>
  }
}

export default App;
