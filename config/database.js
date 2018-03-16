'use strict'
module.exports = (mongoose, config) => {
  const database = mongoose.connection
  mongoose.Promise = Promise
  mongoose.connect(config.database, { promiseLibrary: global.Promise })

  database.on('error', error => console.log('Conexão ao banco Cadmus falhou:', error))
  database.on('connected', () => console.log('Conectado ao banco Cadmus'))
  database.on('disconnected', () => console.log('Desconectado do banco Cadmus'))

  process.on('SIGINT', () => {
    database.close(() => {
      console.log('Banco Cadmus teve a conexão fechada')
      process.exit(0)
    })
  })
}
