'use strict'
const passportJWT = require('passport-jwt')
const ExtractJWT = passportJWT.ExtractJwt
const Strategy = passportJWT.Strategy
const { secret } = require('.')
const { User } = require('./../server/app/setup')

module.exports = passport => {
  const parameters = {
    secretOrKey: secret,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
  }

  passport.use(new Strategy(parameters, async (payload, done) => {
    const user = await User.findOne(payload.id).exec()
    if (!user) {
      return done(new Error('Invalid user'), false)
    }

    if (user) {
      return done(null, user)
    } else {
      done(null, false)
    }
  }))
}
