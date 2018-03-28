'use strict'
const mongoose = require('mongoose')

const Schema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title:{ type: String, required: true }, 
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }]
}, { timestamps: true })

mongoose.model('Book', Schema)
