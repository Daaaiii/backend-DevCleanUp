
const express = require('express');
const { newUser, login } = require('./controllers/user');
const checkLogin = require('./middleware/checkLogin');
const routes = express()

routes.post('/login', login)
routes.post('/user', newUser)

routes.use(checkLogin);

// routes.get('/clients/?:id', (req, res) => { })
// routes.post('/client/:id', (req, res) => { })
// routes.put('/client/:id', (req, res) => { })
module.exports = routes;