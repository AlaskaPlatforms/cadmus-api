'use strict'
const { Chapter } = require('./../setup')
const api = {}

api.addChapter = async (req, res) => {
  if (!req.body.index || !req.body.text) {
    res.status(400)
  } else {
    const { index, text } = req.body
    try {
      await new Chapter({ description }).save()
      res.json({ success: true, message: 'Capítulo criado com sucesso' })
    } catch (error) {
      throw new Error(error)
      res.status(400)
    }
  }
}

api.getChapter = async (req, res) => {
  if (!req.body.id) {
    res.status(400)
  } else {
    Chapter.findOne({ '_id': req.body.id }, (err, chapter) => {
      if (err) {
        res.status(400)
      } else {
        res.send(chapter)
      }
    })
  }
}

module.exports = api
