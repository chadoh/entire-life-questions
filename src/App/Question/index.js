import React from 'react';
import { Redirect } from 'react-router-dom';

import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import Loader from '../Loader'
import Show from './Show'

class Wrap extends React.Component {
  state = {
    loading: true,
    question: null,
  }

  async componentDidMount() {
    const { client, match} = this.props;
    const result = await client.query({
      query: QUESTION_SET_QUERY,
      variables: { id: match.params.id },
    })
    this.setState({
      loading: false,
      question: result.data.questionSets[0],
    })
  }

  render() {
    if (this.state.loading) return <Loader />
    if (!this.state.question) return <Redirect to="/" />
    return <Show {...this.state.question} />
  }
}

const QUESTION_SET_QUERY = gql`
  query QuestionSetQuery($id: ID!) {
    questionSets(filter: { id: $id}) {
      id
      questions
      template
      user {
        email
      }
      # published
      # category
      # questions_proposal
      # template_proposal
      # updated_at
      # created_at
    }
  }
`

export default withApollo(Wrap)
