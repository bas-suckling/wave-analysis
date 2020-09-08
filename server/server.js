const path = require('path')
const express = require('express')
const sessions = require('./routes/sessions')
const cors = require('cors')

const server = express()

server.use('/api/v1/sessions', sessions)
server.use(cors())

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

module.exports = server
