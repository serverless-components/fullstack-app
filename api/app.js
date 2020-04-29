const express = require('express')
const app = express()
const { leads } = require('./controllers')

/**
 * Middleware
 */

// Enable JSON use
app.use(express.json())

// Enable CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('x-powered-by', 'serverless-express')
  next()
})

/**
 * Routes
 */
app.post(`/leads`, leads.save)

app.get(`/test`, (req, res) => {
  res.status(200).send('Request received')
})

app.get(`/*`, (req, res) => {
  res.status(404).send('Route not found')
})

app.options(`*`, (req, res) => {
  res.status(200).send()
})

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send('Internal Serverless Error')
})

module.exports = app