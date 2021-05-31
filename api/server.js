// BUILD YOUR SERVER HERE
const express = require('express')
const User = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', async (req, res) =>{
    try {
        const users = await User.find()
        res.json(users)
    } catch(err) {
        res.status(500).json({ 
        message: 'The users information could not be retrieved',
        error: err.message,
    }) 
    }
})


server.get('/api/users/:id', async (req, res) =>{
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404).json({
                message: `The user with the ID ${req.params.id} does not exist`
            })
        } else {
        res.json(user)
        }
    } catch(err) {
        res.status(500).json({ 
        message: 'The user information could not be retrieved',
        error: err.message,
    }) 
    }
})

server.post('/api/users', async (req, res) =>{
    try {
        if (!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: 'Please provide name and bio for the user',
            })
        }else{
        const newUser = await User.insert(req.body)
        res.status(201).json(newUser)
        }
    } catch(err) {
        res.status(500).json({ 
        message: 'There was an error while saving the user to the database',
        error: err.message,
        }) 
    }
    })
module.exports = server; 
// EXPORT YOUR SERVER instead of {}
