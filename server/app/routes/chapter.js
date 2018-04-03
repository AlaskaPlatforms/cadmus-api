'use strict'
module.exports = app => {
  const api = app.app.api.chapter

  app.route('/api/v1/chapter')
    .get(api.getChapter)
    .post(api.addChapter)
}
