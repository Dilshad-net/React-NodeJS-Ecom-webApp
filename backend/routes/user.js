const express = require('express')
const router = new express.Router()
const mongoose = require('../db/mongoose')
const User = require('../models/user')
const {auth, isAuth} = require('../middleware/auth')

router.get('/user', (req, res) => {
    res.send('User router here')
})

router.post('/users/signin', async (req, res) => {
    try {
        const user = await User.find({ email: req.body.email, password: req.body.password})

        if (!user) {
            res.status(404).send('Sorry no user')
        }
        res.send({user, token: auth(user)})
    } catch (error) {
        res.status(500).send('Internal error')
    }
})

router.post('/users/signup', async (req, res) => {
    const user = new User({name: req.body.name, email: req.body.email, password: req.body.password})
    try {
        await user.save()
        res.send({ user, token: auth(user) })
    } catch (error) {
        res.status(400).send('Internal error')
    }
})

module.exports = router