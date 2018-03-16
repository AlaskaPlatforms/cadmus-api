'use strict'
const api = {}

api.status = (req, res) => {
  res.json({
    service: 'Cadmus API',
    server_status: 'Normal',
    status: 200
  })
}

module.exports = api