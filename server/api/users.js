const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})


router.put('/:id', async (req,res,next) => {
  try {
    const currUser = await User.findById(req.session.passport.user)
    const user = await User.findById(req.params.id)
    if (currUser.familyId !== user.Id) {
      res.send('not allowed to perform this action')
    } 
    await user.update(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})