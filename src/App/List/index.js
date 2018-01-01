import React from 'react'
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
          <td>{question.questions.ask}</td>
          <td>✔</td>
        </tr>
      )}
    </tbody>
  </table>
);
