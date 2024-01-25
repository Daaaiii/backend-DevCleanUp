
const express = require('express');
const { newUser } = require('./controllers/user');
const routes = express()

routes.get('/login', (req, res) => { })
routes.post('/user', newUser)
routes.get('/clients/?:id', (req, res) => { })
routes.post('/client/:id', (req, res) => { })
routes.put('/client/:id', (req, res) => { })
module.exports = routes;