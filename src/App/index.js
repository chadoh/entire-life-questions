import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import createDatabase from '../database';

import Loader from './Loader'
import SigningIn from './SigningIn'
import ScrollToTop from './ScrollToTop'
import Home from './Home'
import Question from './Question'
import * as Help from './Help'

import './App.css';

const API_ROOT = "https://entire-life.herokuapp.com"

const initialState = {
  questions: null,
  questionIds: null,
  auth: null,
}

const db = createDatabase('questions', initialState)

fetch(API_ROOT + '/question_sets')
  .then(res => res.json())
  .then(json => {
    db.setData({
      questions: json.question_sets.reduce(
        (acc, q) => (acc[q.id] = q) && acc,
        {}
      ),
      questionIds: json.question_sets.map(q => q.id),
    });
  });

class App extends Component {

  componentDidMount() {
    db.on('update', this.rerender)
  }

  componentWillUnmount() {
    db.off('update', this.rerender)
  }

  rerender = () => {
    this.forceUpdate()
  }

  render() {
    const { questions, questionIds, auth } = db.getData();
    if (!questionIds) return <Loader />;
    return <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" render={() =>
            <Home questions={questionIds.map(id => questions[id])} auth={auth} />
          }/>
          <Route exact path="/help/question-sets" component={Help.QuestionSets} />
          <Route exact path="/help/templates" component={Help.Templates} />
          <Route exact path="/signing-in" render={props =>
            <SigningIn setData={db.setData} {...props} />
          } />
          <Route path="/:id" render={({match}) => {
            const question = questions[match.params.id];
            if (!question) return <Redirect to="/" />;
            return <Question {...question} />;
          }}/>
        </Switch>
      </ScrollToTop>
    </Router>
  }
}

export default App;
