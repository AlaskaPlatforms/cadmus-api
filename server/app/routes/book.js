'use strict'
module.exports = app => {
  const api = app.app.api.book

  app.route('/api/v1/book')
    .get(api.getBooks)
    .post(api.addBook)
  
  app.route('/api/v1/book/:id')
    .get(api.getUserBooks)
    .delete(api.deleteBook)
}
