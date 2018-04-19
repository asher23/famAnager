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
            userId,
            familyId,
            dueDate
        })
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
        // console.log('user from apssport', user) 
    } catch (error) {
        
    }
})