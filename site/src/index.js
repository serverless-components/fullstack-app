import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

/**
 * Global Config
 */

window.serverless = {}
window.serverless.urls = {}
if (window.location.host.includes('localhost:')) {
  console.log('here')
  window.serverless.urls.api = `https://5xm2qt2k4m.execute-api.us-east-1.amazonaws.com`
} else {
  window.serverless.root = window.location.hostname.replace('www.', '')
  window.serverless.urls.api = `https://api.${window.serverless.root}`
}

/**
 * Render App
 */

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)