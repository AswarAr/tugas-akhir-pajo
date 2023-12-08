require ('dotenv').config()

const express = require('express')
const cors = require('cors')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')

const Auth = require('./routers/auth')
const User = require('./routers/user')
const Admin = require('./routers/admin')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({ secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 2 * 60 * 60 * 1000 }
 })
)
app.use(flash())

app.use(Auth)
app.use(User)
app.use('/admin', Admin)

console.log(`App running on port ${process.env.PORT}`)

app.listen(process.env.PORT)
