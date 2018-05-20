import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { QuestionSet } from 'react-quizzical';

import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'

import Loader from '../Loader'
import Columns from '../Columns';
import Editor from './Editor';
import './Question.css'

const change = attr => newValue => {
  console.log('new ' + attr, newValue);
}

const Question = ({template, questions}) => <React.Fragment>
  <div><Link to="/">Entire.Life Questions</Link></div>
  <h1>{questions.ask}</h1>

  <Columns>
    <div>
      <h2 className="Question-h2">Question Set</h2>
      <p>
        A question set forms a sort of flow chart. The answer to one question
        determines which question is shown next. Once the end of a flow is reached,
        the save button is shown. Clicking the save button fires a "save" event
        with a filled-in event template (see below). <Link
        to="/help/question-sets">Learn more about Question Sets</Link>.
      </p>
      <Editor
        onChange={change('questions')}
        value={questions}
        height="50vh"
      />

      <h2 className="Question-h2">Event Template</h2>
      <p>
        After someone answers all the questions in the Question Set, an event will
        be created that looks a bit like the following. <Link
        to="/help/templates">Learn more about the templating system</Link>.
      </p>
      <Editor
        onChange={change('template')}
        value={template}
        height="150px"
      />
    </div>

    <div>
      <h2 className="Question-h2">Demo</h2>
      <QuestionSet
        questions={questions}
        template={template}
      />
    </div>
  </Columns>
</React.Fragment>

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
    return <Question {...this.state.question} />
  }
}

const QUESTION_SET_QUERY = gql`
  query QuestionSetQuery($id: ID!) {
    questionSets(filter: { id: $id}) {
      id
      questions
      template
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
