'use strict'
const express = require('express')
const Cadmus = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const consign = require('consign')
const morgan = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')

const configEnv = require('./env')
configEnv(process.env.NODE_ENV)

const passportConfig = require('./passport')
const config = require('.')
const database = require('./database')

console.log(config)

passportConfig(passport)
database(mongoose, config)

Cadmus.use(bodyParser.json())
Cadmus.use(bodyParser.urlencoded({ extended: true }))
Cadmus.use(morgan('dev'))
Cadmus.use(cors())
Cadmus.use(passport.initialize())

Cadmus.set('tokensecret', process.env.SECRET)

consign({ cwd: 'server' })
  .include('app/setup')
  .include('app/api')
  .include('app/routes')
  .into(Cadmus)

Cadmus.app.setup.index.status()

module.exports = Cadmus
