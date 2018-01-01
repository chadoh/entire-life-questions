import React from 'react';

export default ({template, questions}) => <React.Fragment>
  <h1>The Event Template</h1>
  <p>
    When you answer the questions, the created event will look a bit like
    this. Learn more about the templating system they use.
  </p>
  <textarea value={JSON.stringify(template)} />
  <h1>The Question Set</h1>
  <p>
    A question set forms a sort of flow chart. The answer to one question
    determines which question you see next. Once the end of a flow is reached,
    the save button is shown. Clicking the "save" button fires a "save" event
    with a filled-in event template.
  </p>
  <textarea value={JSON.stringify(questions)} />
</React.Fragment>
