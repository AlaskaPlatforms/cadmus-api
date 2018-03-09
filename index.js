'use strict'
const http = require('http')
const Cadmus = require('./config/app')
const Server = http.Server(Cadmus)
const PORT = process.env.PORT || 8000

Server.listen(PORT, () => console.log('Servidor rodando em:', PORT))

if (process.env.NODE_ENV === 'production') {
  console.log('Servidor rodando em modo de produção')
} else if (process.env.NODE_ENV === 'dev') {
  console.log('Servidor rodando em modo de desenvolvimento')
}
