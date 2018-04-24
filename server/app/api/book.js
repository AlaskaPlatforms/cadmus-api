'use strict'
const { Book } = require('./../setup')
const { User } = require('./../setup')
const { Chapter } = require('./../setup')
const api = {}

api.addBook = async (req, res) => {
  if (!req.body.userId || !req.body.title || !req.body.description) {
    res.status(400)
  } else {
    const { userId, title, description } = req.body
    try {
      const newBook = new Book({ userId, title, description })
      await newBook.save()
      User.update({ _id: userId }, { $push: { books: newBook._id }}, (err) => {
        if (err) res.status(400)
      })
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

api.deleteBook = async (req, res) => {
  if (!req.params.id) {
    res.status(400)
  } else {
    Book.findOne({ '_id': req.params.id }, (err, book) => {
      if (err) res.status(400)
      else {
        // Deleta os capítulos desse livro
        book.chapters.forEach(chapterId => {
          Chapter.remove({ '_id': chapterId }, (err) => {
            if (err) res.status(400)
          })
        })

        // Deleta a ref desse livro no User
        User.update({ books: req.params.id }, { $pull: { books: req.params.id }}, (err) => {
          if (err) res.status(400)
        })

        // Deleta o livro
        Book.remove({ '_id': req.params.id }, (err) => {
          if (err) res.status(400)
          else {
            res.status(200).json({ success: true, message: 'Livro deletado com sucesso' })
          }
        })
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
