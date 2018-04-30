const router = require('express').Router()
const {Task, User} = require('../db/models')
module.exports = router


router.post('/', async (req,res,next) => {
    try {
        const {description, payment, assignee, userId, familyId, dueDate} = req.body
        const task = await Task.create({
            description,
            payment,
            assignee,
            dueDate,
            familyId
        })
        task.addUser(userId)
        const tasks = await Task.findAll({
            where: {
                id: familyId
            }
        })
        res.json(tasks)
    } catch (err) {
        next(err)
    }

})


router.get('/', async (req, res, enxt) => {
    try {
        const user = await User.findById(req.session.passport.user)
        const tasks = await user.getTasks();
        res.json(tasks)
    } catch (error) {
        
    }
})