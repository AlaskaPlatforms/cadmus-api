'use strict'
const { Book } = require('./../setup')
const api = {}

api.addBook = async (req, res) => {
  if (!req.body.userId || !req.body.title || !req.body.description) {
    res.status(400)
  } else {
    const { userId, title, description } = req.body
    try {
      await new Book({ userId, title, description }).save()
      res.json({ success: true, message: 'Livro criado com sucesso' })
    } catch (error) {
      throw new Error(error)
      res.status(400)
    }
  }
}

api.getUserBooks = async (req, res) => {
  if (!req.params.id) {
    res.status(400)
  } else {
    Book.find({ 'userId': req.params.id }, (err, books) => {
      if (err) {
        res.status(400)
      } else {
        res.send(books)
      }
    })
  }
}

api.getBooks = async (req, res) => {
  Book.find({}, (err, books) => {
    res.send(books)
  })
}

module.exports = api
