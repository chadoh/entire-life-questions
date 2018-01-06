import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import Home from './Home'
import Question from './Question'
import * as Help from './Help'
import './App.css';

const API_ROOT = "https://entire-life.herokuapp.com"

class App extends Component {

  state = {
    db: null,
    ids: null,
  }

  componentDidMount() {
    fetch(API_ROOT + '/question_sets')
      .then(res => res.json())
      .then(json => {
        this.setState({
          db: json.question_sets.reduce(
            (acc, q) => (acc[q.id] = q) && acc,
            {}
          ),
          ids: json.question_sets.map(q => q.id),
        });
      });
  }

  render() {
    const { db, ids } = this.state;
    if (!db) return "Loading..."
    return <Router>
      <ScrollToTop>
        <Switch>
          <Route exact path="/" render={() =>
            <Home questions={ids.map(id => db[id])}/>
          }/>
          <Route exact path="/help/question-sets" component={Help.QuestionSets} />
          <Route exact path="/help/templates" component={Help.Templates} />
          <Route path="/:id" render={({match}) => {
            const question = db[match.params.id];
            if (!question) return <Redirect to="/" />;
            return <Question {...question} />;
          }}/>
        </Switch>
      </ScrollToTop>
    </Router>
  }
}

export default App;
