const express = require('express')
const cors = require('cors')
const server = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ping-ponguin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.set('useFindAndModify', false)

server.listen(3333, () => console.log('Server ready on port 3333'))
server.use(express.json())
server.use(cors())
server.set('json spaces', 2)

server.use('/users', require('./routes/users'))
server.use('/signup', require('./routes/signup'))
server.use('/signin', require('./routes/signin'))
server.use('/verify', require('./routes/verify'))
server.use('/logout', require('./routes/logout'))
