import React from 'react'
import List from './List'

import { login } from '../auth0'

const paragraphFor = auth => {
  if (auth) return (
    <p className="App-p">
      Signed in as {auth.idTokenPayload.name}
    </p>
  );
  return (
    <p className="App-p">
      <button className="pseudo" onClick={login}>Sign in</button> to add and
      edit questions.
    </p>
  )
}

export default ({questions, auth}) => (
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
    {paragraphFor(auth)}
    <List questions={questions} />
  </React.Fragment>
)
