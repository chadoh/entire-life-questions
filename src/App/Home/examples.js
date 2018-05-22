export const questions = JSON.stringify({
  "ask": "[example] When did something happen?",
  "type": "DATE",
  "set": "starting",
  "then": {
    "ask": "How did it make you feel?",
    "choices": [
      {
        "text": "happy",
        "set": { "emoji": ":smile:" }
      },
      {
        "text": "sad",
        "set": { "emoji": ":frowning:" }
      }
    ]
  }
})

export const template = JSON.stringify({
  "title": "You can include the variables you set above in curly brackets in any of these fields",
  "emoji": "{{emoji}}",
  "starting": "{{starting}}",
  "description": "You must include the above three attributes in the template. This one is optional, though."
})
