'use strict'
const mongoose = require('mongoose')
const UserModel = require('./../models/user')
const BookModel = require('./../models/book')
const ChapterModel = require('./../models/chapter')

const models = {
  User: mongoose.model('User'),
  status () {
    let loaded = []
    let failed = []
    try {
      console.log('\nModels correctly started:')
      if (UserModel) {
        loaded.push(' - User')
      } else {
        failed.push(' - User')
      }

      if (BookModel) {
        loaded.push(' - Book')
      } else {
        failed.push(' - Book')
      }

      if (ChapterModel) {
        loaded.push(' - Chapter')
      } else {
        failed.push(' - Chapter')
      }

      loaded.forEach(model => {
        console.log(model)
      })
    } finally {
      console.log('\nModels that failed to start:')
      failed.forEach(model => {
        console.log(model)
      })
      console.log('\n')
    }
  }
}

module.exports = models
