const router = require('express').Router()
const {Family, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Family.findAll({
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/mine', async (req, res, next) => {
    try {
        const user = await User.findById(req.session.passport.user)
        const family = await Family.findOne({
            where: {
                id: user.familyId
            },
            include: [{
                all: true,
                nesting: true
            }]
        })
        res.json(family)        
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req,res,next) => {
    try {
        const { userId, familyName } = req.body
        console.log('USERID INT HE BACKEND', req.body.userId)
        const family = await Family.create({
            name: familyName
        })
        const user = await User.findOne({
            where: {
                id: userId
            }
        })
        family.addUser(userId)
        user.update({role: 'adult'})
        res.json(family)
    } catch (err) {
        next(err)
    }
})

