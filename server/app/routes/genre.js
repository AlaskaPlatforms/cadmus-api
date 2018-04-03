'use strict'
module.exports = app => {
  const api = app.app.api.genre

  app.route('/api/v1/genre')
    .get(api.getAll)
    .post(api.addGenre)
}
