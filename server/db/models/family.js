const Sequelize = require('sequelize')
const db = require('../db')

const Family = db.define('family', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
})

module.exports = Family

