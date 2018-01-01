import React from 'react'
import List from './List'

export default ({questions}) => (
  <React.Fragment>
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
    <List questions={questions} />
  </React.Fragment>
)
