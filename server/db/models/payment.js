const Sequelize = require('sequelize')
const db = require('../db')

const Payments = db.define('payments', {
  amount: {
    type: Sequelize.FLOAT
  },
  date: {
    type: Sequelize.DATE
  }
})

module.exports = Payments