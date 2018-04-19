const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
    description: {
        type: Sequelize.STRING
    },
    payment: {
        type: Sequelize.STRING
    },
    assignee: {
        type: Sequelize.STRING
    },
    family: {
        type: Sequelize.STRING
    },
    completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    dueDate: {
        type: Sequelize.DATE
    }
})

module.exports = Task



