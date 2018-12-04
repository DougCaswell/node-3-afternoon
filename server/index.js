require('dotenv').config();
const express = require('express');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession')
const swag_controller = require('./controllers/swag_controller')
const auth_controller = require('./controllers/auth_controller')
const cart_controller = require('./controllers/cart_controller')
const search_controller = require('./controllers/search_controller')


const { SESSION_SECRET, SERVER_PORT } = process.env

const app = express()

app.use(express.static(__dirname + '/../build'))
app.use(express.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(checkForSession)

app.get('/api/swag', swag_controller.read)

app.get('/api/user', auth_controller.getUser)
app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)

app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.remove)

app.get('/api/search', search_controller.search)

app.listen(SERVER_PORT, console.log("I'm alive!!  My address is port:", SERVER_PORT))