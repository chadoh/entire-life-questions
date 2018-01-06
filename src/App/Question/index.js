import React from 'react';
import { Link } from 'react-router-dom';

import Editor from './Editor';
import './Question.css'

const change = attr => newValue => {
  console.log('new ' + attr, newValue);
}

export default ({template, questions}) => <React.Fragment>
  <div><Link to="/">Entire.Life Questions</Link></div>
  <h1>{questions.ask}</h1>

  <h2 className="Question-h2">Event Template</h2>
  <p>
    After someone answers this questions &amp; all follow-ups, an event will be
    created that looks a bit like the following. <Link to="/help/templates">
    Learn more about the templating system</Link>.
  </p>
  <Editor
    onChange={change('template')}
    value={template}
    height="130px"
  />

  <h2 className="Question-h2">Question Set</h2>
  <p>
    A question set forms a sort of flow chart. The answer to one question
    determines which question is shown next. Once the end of a flow is reached,
    the save button is shown. Clicking the save button fires a "save" event
    with a filled-in event template. <Link to="/help/question-sets">Learn more
    about Question Sets</Link>.
  </p>
  <Editor
    onChange={change('questions')}
    value={questions}
    height="50vh"
  />
</React.Fragment>
