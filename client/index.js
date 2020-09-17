import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import { DataStore } from '../dataStore'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <DataStore>
      <App />
    </DataStore>,
    document.getElementById('app')
  )
})
