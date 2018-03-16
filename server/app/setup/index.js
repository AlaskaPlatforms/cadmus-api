'use strict'
const mongoose = require('mongoose')
const UserModel = require('./../models/user')

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
