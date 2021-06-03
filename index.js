require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const server = require('./api/server');

server.use(express.json())
server.use(cors())

console.log(process.env.USER) 
console.log(process.env.SHELL)

if (process.env.NODE_ENV === 'production') {
  console.log('this means this code is deployed')
}

const PORT = process.env.PORT || 6000

console.log('port is -> ', PORT)

server.get('/api', (req, res) => {
  res.json({ message: `${process.env.COHORT} ROCKS` })
})

server.use((req, res) => {
  res.status(404).json({ message: 'not found sorry' })
})

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})