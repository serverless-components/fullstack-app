import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

/**
 * Global Config
 */

window.serverless = {}
window.serverless.urls = {}
window.serverless.urls.api = `https://api.serverless-fullstack-app.com`

/**
 * Render App
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)