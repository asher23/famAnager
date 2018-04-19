const router = require('express').Router()
const {Family, User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Family.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
  })
    .then(users => res.json(users))
    .catch(next)
})

router.get('/mine', async (req, res, next) => {
    console.log(' u should be called rn');
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
            id: userId
        })
        family.addUser(userId)
        user.update({role: 'adult'})
        res.json(family)
    } catch (err) {
        next(err)
    }
})

