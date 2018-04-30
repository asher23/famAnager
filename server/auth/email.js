// const stripe = require('stripe')('sk_test_a8UWvyjpE34OGIt0Xv0BVafg');
const router = require('express').Router()
const nodemailer = require('nodemailer')
const randomstring = require("randomstring");
const {Invitation} = require('../db/models')

module.exports = router


let tranporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'mahasabr601431@gmail.com',
        pass: 'Asher81shortest'
    },
    tls: {
        rejectUnauthorized: false
    }
})

router.post('/sendInvite', async(req, res, next) => {
    var random = randomstring.generate() 
    var from = req.body.from
    var to = req.body.to
    var family = req.body.family
    var familyId = req.body.familyId
    var text =  `<h1> hiii! Hi!, ${from} sent you hey man u suck ODDDDDDDDDDDan invite to join his/her family!!!</h1> 
    <a href="http://localhost:8080/invitation/${random}">To join please click thi slink</a>
    Try it Yourself »
    ` 
    var helperOptions = {
        from: `"Maha Sabr" <mahasabr601431@gmail.com`,
        to: to,
        subject: 'Invite to Join Family',
        html: text
    }   
    try {
        const invitation = await Invitation.create({uniqueLink: random, from, to, family, familyId})
        tranporter.sendMail(helperOptions, (error, info) => {
            if (error) {
                res.send('there was an error' + error) 
            } else {
                res.json('success!')
            }
        })
    } catch (err) {
        next(err)
    }
})

router.get('/getInvite/:randomCode', (req, res, next) => {
    Invitation.findOne({
        where: {
            uniqueLink: req.params.randomCode
        }
    })
    .then((invitation) => {
        res.json(invitation)
    })
    .catch(next)
})

router.post('/respondToInvite', async () => {
    const invite = await Invitation.findOne({
        where: {
            uniqueLink: req.body.inviteCode
        }
    })
    invite.update({completed: true})
    if (req.body.response === 'yes') {
        
    }
})