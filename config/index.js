'use strict'
module.exports = {
  secret: process.env.SECRET,
  session: { session: false },
  database: process.env.DB_HOST
}
