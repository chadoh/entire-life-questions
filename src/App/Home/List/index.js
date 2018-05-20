import React from 'react'
import { Link } from 'react-router-dom';
import './List.css'

export default ({questions}) => (
  <table className="List">
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
          <td>
            <Link to={`/${question.id}`}>
              {question.questions.ask}
            </Link>
          </td>
          <td>{question.published ? '✔' : ''}</td>
        </tr>
      )}
    </tbody>
  </table>
);
