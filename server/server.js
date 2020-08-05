const path = require('path')
const express = require('express')
const sessions = require('./routes/sessions')

const server = express()

server.use('/api/v1/sessions', sessions)

server.use(express.json())
server.use(express.static(path.join(__dirname, './public')))

module.exports = server
