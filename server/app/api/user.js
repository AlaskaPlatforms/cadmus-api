'use strict'
const { User } = require('./../setup')
const api = {}

api.signup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).json({ success: false, message: 'Por favor, forneça um usuário e senha' })
  } else {
    const { username, email, password } = req.body
    try {
      await new User({ username, email, password }).save()
      res.json({ success: true, message: 'Conta criada com sucesso' })
    } catch (error) {
      throw new Error(error)
      res.status(400).json({ success: false, message: 'Esta conta já existe' })
    }
  }
}

module.exports = api
