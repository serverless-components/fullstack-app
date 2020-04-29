import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

/**
 * Global Config
 */

window.serverless = {}
window.serverless.urls = {}
window.serverless.root = window.location.hostname.replace('www.', '')
window.serverless.urls.api = `https://api.${window.serverless.root}`

/**
 * Render App
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)