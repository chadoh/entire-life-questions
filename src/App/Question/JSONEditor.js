import React from 'react';
import Ace from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/tomorrow_night_eighties'

let inError = false;

const validate = errors => {
  if (errors.length) inError = true;
  else inError = false;
}

const change = onChange => newValue => {
  if (!inError) onChange(newValue);
}

export default ({value, onChange, height, readOnly = true}) => <Ace
  mode="json"
  theme="tomorrow_night_eighties"
  width="100%"
  readOnly={readOnly}
  height={height}
  fontSize={16}
  tabSize={2}
  debounceChangePeriod={700}
  value={JSON.stringify(value, null, '\t')}
  onChange={change(onChange)}
  onValidate={validate}
  editorProps={{$blockScrolling: true}}
/>
