import React from 'react'
import List from './List'

import { getUser, login, logout } from '../auth'


export default class Home extends React.Component {
  logout = () => {
    logout()
    this.forceUpdate()
  }

  paragraphForUser = () => {
    const user = getUser()
    if (user) return (
      <p className="App-p">
        Signed in as {user.name} •{' '}
        <button className="pseudo" onClick={this.logout}>Sign out</button>
      </p>
    );
    return (
      <p className="App-p">
        <button className="pseudo" onClick={login}>Sign in</button> to add and
        edit questions.
      </p>
    )
  }

  render() {
    return (
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
        {this.paragraphForUser()}
        <List />
      </React.Fragment>
    )
  }
}
