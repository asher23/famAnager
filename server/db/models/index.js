const User = require('./user')
const Family = require('./family')
const Payment = require('./payment')
const Task = require('./task')
const Invitation = require('./invitation')


Family.hasMany(User)
Family.hasMany(Task)

Task.belongsToMany(User, {through: 'UserTask'});
User.belongsToMany(Task, {through: 'UserTask'});


User.belongsTo(Family)
User.hasMany(Task)

Payment.belongsTo(User, {as: 'from', foreignKey : 'fromId'});
Payment.belongsTo(User, {as: 'to', foreignKey : 'toId'});


module.exports = {
  User,
  Family, 
  Payment,
  Task,
  Invitation
}