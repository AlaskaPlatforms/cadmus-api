'use strict'
const { Genre } = require('./../setup')
const api = {}

api.addGenre = async (req, res) => {
  if (!req.body.description) {
    res.status(400).json({ success: false, message: 'Informe um gênero' })
  } else {
    const { description } = req.body
    try {
      await new Genre({ description }).save()
      res.json({ success: true, message: 'Gênero criado com sucesso' })
    } catch (error) {
      throw new Error(error)
      res.status(400).json({ success: false, message: 'Esse gênero já existe' })
    }
  }
}

api.getAll = async (req, res) => {
  Genre.find({}, (err, genres) => {
    res.send(genres)
  })
}

module.exports = api
