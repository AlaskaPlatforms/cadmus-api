'use strict'
module.exports = app => {
  const api = app.app.api.status

  app.route('/')
    .get(api.status)
}
