'use strict'
module.exports = app => {
  const api = app.app.api.user

  app.route('/api/v1/signup')
    .post(api.signup)
    .get(api.getUsers)
}
