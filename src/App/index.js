import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import List from './List'
import './App.css';

const API_ROOT = "https://entire-life.herokuapp.com"

class App extends Component {

  state = {
    questions: null
  }

  componentDidMount() {
    fetch(API_ROOT + '/question_sets')
      .then(res => res.json())
      .then(json => {
        this.setState({questions: json.question_sets});
      });
  }

  render() {
    const { questions } = this.state;
    if (!questions) return "Loading..."
    return <React.Fragment>
      <h1 className="App-title">
        Entire.Life<br />
        <span className="App-titleHighlight">QUESTIONS</span>
      </h1>
      <p className="App-p">
        These are all the questions available
        on <a href="https://entire.life">Entire.Life</a>.
        Answering these questions automatically adds a corresponding event to
        your life chart.
      </p>
      <p className="App-p">
        Sign in to add and edit questions.
      </p>
      <Router>
        <Switch>
          <Route exact match="/" render={() =>
            <List questions={questions}/>
          }/>
        </Switch>
      </Router>
    </React.Fragment>;
  }
}

export default App;
