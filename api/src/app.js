const express = require('express')
const app = express()
const passport = require('passport')
const {
  users
} = require('./controllers')

// Configure Passport
require('./config/passport')(passport)

/**
 * Configure Express.js Middleware
 */

// Enable CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('x-powered-by', 'serverless-express')
  next()
})

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize())
app.use(passport.session())

// Enable JSON use
app.use(express.json())

/**
 * Routes
 */

app.options(`*`, (req, res) => {
  res.status(200).send()
})

app.post(`/users/register`, users.register)

app.post(`/users/login`, users.login)

app.post(`/user`, passport.authenticate('jwt', { session: false }), users.get)

app.get(`/test`, (req, res) => {
  res.status(200).send('Request received')
})

app.get(`/*`, (req, res) => {
  res.status(404).send('Route not found')
})

/**
 * Error Handler
 */
app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send('Internal Serverless Error')
})

module.exports = app