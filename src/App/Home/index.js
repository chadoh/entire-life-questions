import React from 'react'
import List, { QUESTION_SETS_QUERY } from './List'

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { getUser, login, logout } from '../../auth'
import * as examples from './examples'

class Home extends React.Component {
  state = {
    user: getUser(),
  }

  logout = () => {
    logout()
    this.setState({user: null})
  }

  addQuestionSet = () => {
    this.props.addMutation({
      variables: examples,
      update: (store, { data: { questionSetAdd } }) => {
        this.afterCreate(store, questionSetAdd)
      },
    })
  }

  afterCreate = (store, questionSet) => {
    const data = store.readQuery({ query: QUESTION_SETS_QUERY })
    data.questionSets.push(questionSet)
    store.writeQuery({ query: QUESTION_SETS_QUERY, data })
    this.props.history.push(`/${questionSet.id}`)
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
      published
      questions
      user {
        name
      }
    }
  }
`

export default graphql(ADD_QUESTION_SET_MUTATION, { name: 'addMutation'})(Home)
