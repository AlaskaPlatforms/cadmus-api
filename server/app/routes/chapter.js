'use strict'
module.exports = app => {
  const api = app.app.api.chapter

  app.route('/api/v1/chapter')
    .post(api.addChapter)
    .get(api.getAll)
  
  app.route('/api/v1/chapter/:id')
    .get(api.getChapter)
    .delete(api.deleteChapter)
    .put(api.updateChapter)
}
