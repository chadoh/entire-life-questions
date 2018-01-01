import React, { Component } from 'react';
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
      <table className="App-table">
        <thead>
          <tr>
            <th>id</th>
            <th>lead</th>
            <th>active</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, i) =>
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.questions.ask}</td>
              <td>✔</td>
            </tr>
          )}
        </tbody>
      </table>
    </React.Fragment>;
  }
}

export default App;
