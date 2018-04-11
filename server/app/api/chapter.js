'use strict'
const { Chapter } = require('./../setup')
const { Book } = require('./../setup')
const api = {}

api.addChapter = async (req, res) => {
  if (!req.body.index || !req.body.text || !req.body.bookId) {
    res.status(400)
  } else {
    const { index, text, bookId } = req.body
    try {
      const newChapter = new Chapter({ index, text, bookId })
      await newChapter.save()

      console.log(newChapter._id)
      // FIX: NOT SAVING newChapter._id TO BOOK chapters ARRAY
      Book.update({ _id: bookId }, { $push: { chapters: newChapter._id }}, (err) => {
        if (err) res.status(400)
      })

      res.json({ success: true, message: 'Capítulo criado com sucesso' })
    } catch (error) {
      throw new Error(error)
      res.status(400)
    }
  }
}

api.getChapter = async (req, res) => {
  if (!req.params.id) {
    res.status(400)
  } else {
    Chapter.findOne({ '_id': req.params.id }, (err, chapter) => {
      if (err) {
        res.status(400)
      } else {
        res.send(chapter)
      }
    })
  }
}

// TODO delete by id

api.getAll = async (req, res) => {
  Chapter.find({}, (err, chapters) => {
    res.send(chapters)
  })
}

module.exports = api
