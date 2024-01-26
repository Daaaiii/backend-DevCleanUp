
const express = require('express');
const { newUser, login } = require('./controllers/user');
const checkLogin = require('./middleware/checkLogin');
const { newClient, getClients, getClientById, updateClient, getDistance } = require('./controllers/client');
const routes = express()

routes.post('/login', login)
routes.post('/user', newUser)

routes.use(checkLogin);

routes.post('/client/', newClient)
routes.get('/client/', getClients)
routes.get('/client/:id', getClientById)
routes.put('/client/:id', updateClient)
routes.get('/distance/', getDistance)
module.exports = routes;