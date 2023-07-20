const express = require('express')
const cors = require('cors')

const morgan = require('morgan')

const app = express()

const { NotFoundError } = require('./expressError')

app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))

const userRoutes = require('./routes/users')

app.use('/', userRoutes)


// 401
app.use(function(req, res, next) {
    return next(new NotFoundError())
})

module.exports = app;