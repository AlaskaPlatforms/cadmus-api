'use strict'
const jwt = require('jsonwebtoken')
const { User } = require('./../setup')
const { secret } = require('./../../../config')
const api = {}

api.login = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username }).exec()

  await user.comparePassword(password, (error, matches) => {
    if (matches && !error) {
      const token = jwt.sign({ user }, secret)
      res.json({ success: true, message: 'Token fornecido', token })
    } else {
      res.status(401).json({ success: false, message: 'Falha ao autenticar, usuário não existe' })
    }
  })
}

api.verify = headers => {
  if (headers && headers.authorization) {
    const splitted = headers.authorization.split(' ')

    if (splitted.length === 2) return splitted[1]
    else return null
  } else return null
}

module.exports = api
