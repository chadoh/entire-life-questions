import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../Container';

const free_form_example =
`{
  "ask": "When now brown cow?",
  "type": "DATE",
  "set": "when",
  "then": { ... }
}`;

const multiple_choice_example =
`{
  "ask": "In your best life you are a:",
  "choices": [
    {
      "text": "Stunt double",
      "set": { "occupation": "Stunt double", "emoji": ":dash:" },
      "then": { ... }
    },
    {
      "text": "Bird",
      "set": { "occupation": "Bird", "emoji": ":bird:" },
      "then": { ... }
    }
  ]
}`;

export default () => <Container>
  <div><Link to="/">Entire.Life Questions</Link></div>
  <h1>How Question Sets Work</h1>
  <p>
    A Question Set is a sort of flow chart of questions. The answer to one
    question determines which one will be asked next.
  </p>
  <p>
    Each specific question in the flow can either be a <strong>free-form
    field</strong> or a <strong>multiple choice field</strong>.
  </p>

  <h2>Free-form field</h2>
  <p>Basic example:</p>
  <pre>{free_form_example}</pre>
  <p>More about each attribute:</p>
  <ul>
    <li>
      <code>"ask"</code> - <strong>required</strong> - the question to ask
    </li>
    <li>
      <code>"set"</code> - <strong>required</strong> - every free-form field
      must set a single variable. When the user types in their answer to the
      question, their answer will be stored in this variable. It can then be
      used in follow-up question's <code>"ask"</code> field or in Event
      Templates. <Link to="/help/templates">Learn more about the templating
      system.</Link>
    </li>
    <li>
      <code>"type"</code> - Either leave this blank for a text field, or set it
      to <code>"DATE"</code> for a date field
    </li>
    <li>
      <code>"then"</code> - The next field to show. Can be omitted to end the
      questioning after the user answers this one. Can be another free-form
      field.  Or it can be a multiple choice field.
    </li>
  </ul>

  <h2>Multiple-choice field</h2>
  <p>Basic example:</p>
  <pre>{multiple_choice_example}</pre>
  <p>
    At the top level, both <code>"ask"</code> and <code>"choices"</code> are
    required.
  </p>
  <p>For each individual choice, here's more about each attribute:</p>
  <ul>
    <li>
      <code>"text"</code> - <strong>required</strong> - the wording of the choice.
    </li>
    <li>
      <code>"set"</code> - Optional here! Note that it is a whole set of
      attributes, whereas a free-form field has only one attribute.
    </li>
    <li>
      <code>"then"</code> - The next field to show. Can be omitted to end the
      questioning after the user answers this one. Can be a free-form field.
      Can be another multiple choice!
    </li>
  </ul>
</Container>
