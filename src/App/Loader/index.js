import React from 'react'
import './Loader.css'

export default ({text = "Loading"}) => (
  <div className="Loader">
    {text}...
  </div>
)
