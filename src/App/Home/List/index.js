import React from 'react'
import { Link } from 'react-router-dom';

import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import './List.css'
import Loader from '../../Loader'

const List = ({data}) => data.loading ?  <Loader /> :
  <table className="List">
    <thead>
      <tr>
        <th>id</th>
        <th>lead</th>
        <th>created by</th>
        <th>active</th>
      </tr>
    </thead>
    <tbody>
      {data.questionSets.map((question, i) =>
        <tr key={question.id}>
          <td>{question.id}</td>
          <td>
            <Link to={`/${question.id}`}>
              {question.questions.ask}
            </Link>
          </td>
          <td>{question.user.name}</td>
          <td>{question.published ? '✔' : ''}</td>
        </tr>
      )}
    </tbody>
  </table>

export const QUESTION_SETS_QUERY = gql`
  query QuestionSetsQuery {
    questionSets {
      id
      published
      questions
      user {
        name
      }
    }
  }
`

export default graphql(QUESTION_SETS_QUERY)(List)
