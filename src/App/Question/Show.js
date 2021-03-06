import React from 'react';
import { Link } from 'react-router-dom';
import { QuestionSet } from 'react-quizzical';
import isEqual from 'lodash/isEqual'

import { getUser } from '../../auth'
import * as localStorage from '../../localStorage'
import Columns from '../Columns';
import JSONEditor from './JSONEditor';
import './Question.css'

class Show extends React.Component {
  constructor(props) {
    super(props)

    const user = getUser()

    const cachedChanges = localStorage.get(props.id) || {}

    this.state = {
      user,
      canEdit: user && user.email === props.user.email,
      questions: cachedChanges.questions || props.questions,
      template: cachedChanges.template || props.template,
    }
  }

  change = attr => newValue => {
    const value = JSON.parse(newValue)
    if (!isEqual(value, this.state[attr])) {
      localStorage.set(this.props.id, { [attr]: value })
      this.setState({ [attr]: value })
    }
  }

  save = async () => {
    await this.props.onSave({
      questions: this.state.questions,
      template: this.state.template,
    })
    localStorage.rm(this.props.id)
  }

  render() {
    const { canEdit, questions, template } = this.state
    const modified = canEdit && (
      !isEqual(questions, this.props.questions) ||
      !isEqual(template, this.props.template)
    )
    return (
      <React.Fragment>
        <div><Link to="/">Entire.Life Questions</Link></div>
        <header className="grid">
          <h1>{questions.ask}</h1>
          {modified &&
            <button onClick={this.save}>Save</button>
          }
        </header>

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
            <JSONEditor
              onChange={this.change('questions')}
              value={questions}
              height="50vh"
              readOnly={!canEdit}
            />

            <h2 className="Question-h2">Event Template</h2>
            <p>
              After someone answers all the questions in the Question Set, an event will
              be created that looks a bit like the following. <Link
              to="/help/templates">Learn more about the templating
              system</Link>. The emoji must be the name of a valid emoji from <a
              href="https://missive.github.io/emoji-mart/">Emoji Mart</a> and
              must contain the colons, like <code>:wave:</code>
            </p>
            <JSONEditor
              onChange={this.change('template')}
              value={template}
              height="150px"
              readOnly={!canEdit}
            />
          </div>

          <div>
            <h2 className="Question-h2">Demo</h2>
            <p style={{marginBottom: '1em', paddingBottom: '1em', borderBottom: '1px dashed silver'}}>
              This is what your question set will look like. Play around with
              it! When you press the Save button, you can open your <a target="_new"
              href="https://developers.google.com/web/tools/chrome-devtools/console/">web
              inspector</a>'s console to see what would be saved.
            </p>
            <QuestionSet
              questions={questions}
              template={template}
            />
          </div>
        </Columns>
      </React.Fragment>
    )
  }
}

export default Show
