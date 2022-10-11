const express = require('express')
const passport = require('passport')
const User = require('../models/users')

const router = express.Router()



router.get('/register', (req, res) => {
    res.render('register.ejs')
})

router.post('/register', async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await User.register(
            new User({ username: username }),
            password
        )
        req.login(user, () => {
            res.redirect('/fish')
        })
    } catch (error) {
        req.flash('error', error.message)
        res.redirect('/register')
    }
    // console.log(req.body.username, req.body.password)
    // User.register({username: 'dandy'}, 'password')
})


router.get('/login', (req, res) => {
    console.log(req.isAuthenticated())
    console.log(req)
    if (req.isAuthenticated()) {
        res.locals.user = req.user
        res.redirect('back')
    } else {
        res.render('login.ejs')
    }
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/fish',
    failureFlash: true
}))

router.post('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/')
    })
})



module.exports = router