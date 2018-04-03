'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  description: { type: String, required: true }
})

mongoose.model('Genre', Schema)
