const Sequelize = require('sequelize')
const db = require('../db')

const Invitation = db.define('invitation', {
    uniqueLink: {
        type: Sequelize.STRING
    },
    from: {
        type: Sequelize.STRING
    },
    family: {
        type: Sequelize.STRING
    },
    to: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    familyId: {
        type: Sequelize.INTEGER
    }
})

module.exports = Invitation