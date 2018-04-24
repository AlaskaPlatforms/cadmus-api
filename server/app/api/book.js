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
      await User.update({ _id: userId }, { $push: { books: newBook._id }})
      res.json({ success: true, message: 'Livro criado com sucesso' })
    } catch (error) {
      throw new Error(error)
      res.status(400)
    }
  }
}

// Get books by user's id
api.getUserBooks = async (req, res) => {
  if (!req.params.id) {
    res.status(400)
  } else {
    await Book.find({ 'userId': req.params.id }, (err, books) => {
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
    try {
      const { id } = req.params
      await Book.findOne({ '_id': id }, async (err) => {
        if (err) res.status(400)
        else {
          try {
            // Deleta os capítulos desse livro
            await Chapter.remove({ 'bookId': id })

            // Deleta a ref desse livro no User
            await User.update({ books: id }, { $pull: { books: id }})

            // Deleta o livro
            await Book.remove({ '_id': id })

            res.status(200).json({ success: true, message: 'Livro deletado com sucesso' })
          } catch (error) {
            throw new Error(error)
            res.status(400)
          }
        }
      })
    } catch (error) {
      throw new Error(error)
      res.status(400)
    }
  }
}

api.getBooks = async (req, res) => {
  Book.find({}, (err, books) => {
    if (err) res.status(400)
    res.send(books)
  })
}

module.exports = api
