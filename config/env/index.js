'use strict'
const configEnv = env => {
  if (env === 'production') {
    process.env.DB_HOST = 'mongodb://admin:admin@ds217349.mlab.com:17349/cadmus-api'
    process.env.SECRET = 'cadmusapi'
  } else {
    process.env.DB_HOST = 'mongodb://admin:admin@ds217349.mlab.com:17349/cadmus-api'
    process.env.SECRET = 'token'
  }
}

module.exports = configEnv
