const express = require('express')

const Fish = require('../models/fish')
const router = express.Router()

router.get('/fish/new', (req, res) => {
    res.render('new.ejs')
})


module.exports = router

