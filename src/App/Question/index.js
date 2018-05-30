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
    const { client, match } = this.props
    const result = await client.query({
      query: QUESTION_SET_QUERY,
      variables: { id: match.params.id },
    })
    this.setState({
      loading: false,
      question: result.data.questionSets[0],
    })
  }

  onSave = async ({questions, template}) => {
    const { client } = this.props
    await client.mutate({
      mutation: UPDATE_QUESTION_SET_MUTATION,
      variables: {
        id: this.state.question.id,
        questions: JSON.stringify(questions),
        template: JSON.stringify(template),
      },
      update: (store, { data: { questionSetUpdate } }) => {
        this.setState({question: questionSetUpdate})
      },
    })
  }

  render() {
    if (this.state.loading) return <Loader />
    if (!this.state.question) return <Redirect to="/" />
    return <Show {...this.state.question} onSave={this.onSave} />
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

const UPDATE_QUESTION_SET_MUTATION = gql`
  mutation UpdateQuestionSetMutation($id: ID!, $template: JSON!, $questions: JSON!) {
    questionSetUpdate(input: {
      questionSetId: $id,
      template: $template,
      questions: $questions
    }) {
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
