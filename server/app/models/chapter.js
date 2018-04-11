'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  index: { type: Number, required: true },
  text: { type: String, required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
}, { timestamps: true })

mongoose.model('Chapter', Schema)
