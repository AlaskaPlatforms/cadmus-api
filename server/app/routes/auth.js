'use strict'
module.exports = app => {
  const api = app.app.api.auth

  app.route('/api/v1/auth')
    .post(api.login)
}
