const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config({path: "./.env"})

//swagger ui        
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

//port
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


let routes = require('./api/routes') //importing route
routes(app)

// app use
app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, options))

app.listen(port)

var options = {
    swaggerOptions: {
            url: 'http://localhost:3000/v2/swagger.json'
    }
}

console.log('RESTful API server started on: ' + port)
