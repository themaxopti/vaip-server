const { Router } = require('express')

const router = Router()
const mongoose = require('mongoose')
const User = require('../models/User')

router.get('/test', async (req, res) => {
    const user = new User({name:"den"})
    await user.save()
    res.json(user.name)
})

module.exports = router