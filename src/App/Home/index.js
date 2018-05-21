import React from 'react'
import List from './List'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { getUser, login, logout } from '../../auth'


class Home extends React.Component {
  state = {
    user: getUser(),
  }

  logout = () => {
    logout()
    this.setState({user: null})
  }

  addQuestionSet = async () => {
    const result = await this.props.add({
      variables: {
        questions: JSON.stringify({
          "ask": "[example] When did something happen?",
          "type": "DATE",
          "set": "starting",
          "then": {
            "ask": "How did it make you feel?",
            "choices": [
              {
                "text": "happy",
                "set": { "emoji": ":smile:" }
              },
              {
                "text": "sad",
                "set": { "emoji": ":frowning:" }
              }
            ]
          }
        }),
        template: JSON.stringify({
          "title": "You can include the variables you set above in curly brackets in any of these fields",
          "emoji": "{{emoji}}",
          "starting": "{{starting}}",
          "description": "You must include the above three attributes in the template. This one is optional, though."
        })
      }
    })
    this.props.history.push(`/${result.data.questionSetAdd.id}`)
  }

  paragraphForUser = () => {
    const { user } = this.state
    if (user) return (
      <React.Fragment>
        <p className="App-p">
          Signed in as {user.name} •{' '}
          <button className="pseudo" onClick={this.logout}>Sign out</button>
        </p>
        <p className="App-p">
          <button onClick={this.addQuestionSet}>
            Create New Question
          </button>
        </p>
      </React.Fragment>
    );
    return (
      <React.Fragment>
        <p className="App-p">
          These are all the questions available
          on <a href="https://entire.life">Entire.Life</a>.
          Answering these questions automatically adds a corresponding event to
          your life chart.
        </p>
        <p className="App-p">
          <button className="pseudo" onClick={login}>Sign in</button> to add and
          edit questions.
        </p>
      </React.Fragment>
    )
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="App-title">
          Entire.Life<br />
          <span className="App-titleHighlight">QUESTIONS</span>
        </h1>
        {this.paragraphForUser()}
        <List />
      </React.Fragment>
    )
  }
}

const ADD_QUESTION_SET_MUTATION = gql`
  mutation AddQuestionSetMutation($template: JSON!, $questions: JSON!) {
    questionSetAdd(input: {
      template: $template,
      questions: $questions
    }) {
      id
    }
  }
`

export default graphql(ADD_QUESTION_SET_MUTATION, { name: 'add'})(Home)
