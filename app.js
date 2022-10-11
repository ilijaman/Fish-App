require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const mongoDBSession = require('connect-mongodb-session')
const methodOverride = require('method-override')
const staticPages = require('./controllers/pages')

const { notFoundHandler, errorHandler } = require('./middlewares/error-handlers')
const userCheck = require('./middlewares/user-check')
const User = require('./models/users')
const Fish = require('./models/fish')
const authController = require('./controllers/auth')
const fishController = require('./controllers/fish-routes')


const app = express()
const PORT = process.env.PORT
const dbURL = process.env.MONGODB_URL
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
    uri: dbURL,
    collection: 'sessions'
})



app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//middleware
app.use((req, res, next) => {
console.log(`${new Date()} ${req.method} ${req.path}`)
    next()
})



app.use(userCheck)
app.use(staticPages)
app.use(authController)
app.use(fishController)
app.use(notFoundHandler)
app.use(errorHandler)



mongoose.connect(dbURL, () => {
    console.log('Connected to fish db')
})


app.listen(PORT, () => {
    console.log('listening on port', PORT)
})