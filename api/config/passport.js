/**
 * Config: Passport.js
 */
  
const StrategyJWT = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const { users } = require('../models')
const { comparePassword } = require('../utils')

module.exports = (passport) => {

  const options = {}
  options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
  options.secretOrKey = process.env.tokenSecret

  passport.use(new StrategyJWT(options, async (jwtPayload, done) => {
    let user
    try { user = await users.getById(jwtPayload.id) }
    catch (error) { 
      console.log(error)
      return done(error, null) 
    }
    console.log(user)
    if (!user) { return done(null, false) }
    return done(null, user)
  }))
}