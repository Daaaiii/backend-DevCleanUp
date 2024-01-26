require('dotenv').config()
const express = require ('express')
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')

const app = express()

app.use(express.json())
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(routes)

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`)
})