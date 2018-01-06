import React from 'react';
import { Link } from 'react-router-dom';

import Container from '../Container';

const settingVariableFreeForm =
`{
  "ask": "What's your favorite color?",
  "set": "color"
}`;

const settingVariableMultipleChoice =
`{
  "ask": "Are you awesome?",
  "choices": [
    {
      "text": "Yes",
      "set": { "awesome": true }
    },
    {
      "text": "No",
      "set": { "awesome": false }
    }
  ]
}`;

const usingVariableInQuestion =
`{
  "ask": "What do you think liking {{color}} says about you to other people?",
}`;

const templateSection =
  "{{#awesome}}That's sick, yo. {{/awesome}}Are you happy?";

const templateSectionInsertion =
  "{{#name}}Hi, {{.}}! {{/name}}How are you today?";

const invertedSection =
  "{{^name}}Weird that you don't have a name. Well. {{/name}}How are you today?";

const bothSections =
  "{{#awesome}}A bit conceited, are we?{{/awesome}}{{^awesome}}Aww, I'm sure you're cool!{{/awesome}}";

const birthdayExample =
  "BIRTHDAY(65)";

export default () => <Container>
  <div><Link to="/">Entire.Life Questions</Link></div>
  <h1>How Templates Work</h1>
  <p>
    In the <Link to="/help/question-sets">Question Set</Link>, you can set a
    variable like this:
  </p>
  <pre>{settingVariableFreeForm}</pre>
  <p>
    This will display a text box, and when the user fills it in, their answer
    will be set to the variable <code>color</code>, which can then be used
    later in the Question Set or in the Event Template like this:
  </p>
  <pre>{usingVariableInQuestion}</pre>
  <p>You can also set a variable with a Multiple Choice field like this:</p>
  <pre>{settingVariableMultipleChoice}</pre>
  <p>
    You can use these variables in the same way. However, for this particular
    example, showing the text "true" or "false" is probably not what we want to
    do. Instead, we probably want to change the whole wording of follow-up
    questions (or, likewise, change the whole wording of the events we create
    on behalf of the user).
  </p>
  <p>How to do that?</p>

  <h2>Template Sections</h2>
  <p>
    You can include whole phrases based on the value of a variable like
    this:
  </p>
  <pre>{templateSection}</pre>
  <p>
    Sticking with the example above, if the user says "Yes" to the question
    "Are you awesome?", the next question could start with "That's sick, yo."
    Otherwise, if they answer "No," it will just ask the next question without
    the interjection.
  </p>
  <p>
    You can also use this to insert variables, depending on if they're defined
    or not.
  </p>
  <pre>{templateSectionInsertion}</pre>
  <p>
    Here, if the variable "name" has been set to, for example, "Chad", the
    phrase will read "Hi, Chad! How are you today?" If the variable "name" has
    not been set, it will just read "How are you today?"
  </p>

  <h2>Template Inverse Sections</h2>
  <p>
    If you want a section to only appear if a variable <em>isn't</em> set, or
    is set to <code>false</code>, you can use an <em>inverted</em> section.
  </p>
  <pre>{invertedSection}</pre>
  <p>This can pair well with regular sections:</p>
  <pre>{bothSections}</pre>
  <p>
    To see this in action, check out the Event Template for <Link to="/8">Have
    you graduated from a school?</Link> and <Link to="/5">Are you
    married?</Link>
  </p>

  <h2>User Birthdays</h2>
  <p>
    One final thing that you can do with templates: insert a user's
    birthday.
  </p>
  <pre>{birthdayExample}</pre>
  <p>
    Why is this useful? You might want to create an event on a particular
    birthday for a user, rather than based on a date that they explicitly
    enter. See an example in <Link to="/6">What do you want to do on your 100th
    birthday?</Link>
  </p>
  <p>
    Right now, this is the only way to insert programatically-generated dates,
    rather than user-generated dates. If you need the ability to generate
    different sorts of dates, <a href="https://twitter.com/chadoh"
    target="_blank" rel="noopener noreferrer">@ me</a> and I'll see what I can
    do.
  </p>
</Container>
