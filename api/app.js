const express = require('express')
const app = express()
const passport = require('passport')
const {
  users
} = require('./controllers')

/**
 * Inference:
 * 
 * When "inference" in serverless.yml is "true", the Serverless Framework will attempt to
 * initialize this application on every deployment, extract its endpoints and generate an OpenAPI specification (super cool)
 * However, the Framework won't have access to the environment variables, causing some things to crash on load.
 * That is why some things have try/catch blocks around them when they are required.
 */

/**
 * Configure Passport
 */

try { require('./config/passport')(passport) }
catch (error) { console.log(error) }

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
 * Routes - Public
 */

app.options(`*`, (req, res) => {
  res.status(200).send()
})

app.post(`/users/register`, users.register)

app.post(`/users/login`, users.login)

app.get(`/test/`, (req, res) => {
  res.status(200).send('Route updated')
})

/**
 * Routes - Protected
 */

app.post(`/user`, passport.authenticate('jwt', { session: false }), users.get)

/**
 * Routes - Catch-All
 */

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

/**
 * OpenAPI Auto-Generation
 */

const openApi = {
  openapi: '3.0.3',
  info: {
    title: null,
    description: null,
    termsOfService: null,
    contact: {
      name: null,
      url: null,
      email: null
    },
    license: {
      name: null,
      url: null
    },
    version: '0.0.1'
  },
  servers: {
    url: null,
    description: null,
    variables: {}
  },
  paths: {},
  components: {
    schemas: {},
    responses: {},
    parameters: {},
    examples: {},
    requestBodies: {},
    headers: {},
    securitySchemes: {},
    links: {},
    callbacks: {}
  },
  security: {},
  tags: {},
  externalDocs: {},
}

const openApiPathItem = {
  description: null,
  summary: null,
  operationId: null,
  responses: {}
}

if (app && app._router && app._router.stack && app._router.stack.length) {
  app._router.stack.forEach((route) => {

    // This array holds all middleware layers, which include routes and more
    // First check if this 'layer' is an express route type, otherwise skip
    if (!route.route) return

    // Define key data
    const ePath = route.route.path

    if (['*', '/*'].indexOf(ePath) > -1) {
      return
    }

    // Save path
    openApi.paths[ePath] = openApi.paths[ePath] || {}

    for (const method in route.route.methods) {
      // Save method
      openApi.paths[ePath][method] = openApiPathItem
    }
  })
}

console.log(openApi)


module.exports = app