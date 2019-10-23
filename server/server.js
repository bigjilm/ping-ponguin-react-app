const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const server = http.createServer(app)
const chatController = require('./chatController')

server.listen(3333, () => console.log('Server ready on port 3333'))

//launch socket.io
chatController(server)

//middleware
app.use(express.json())
app.use(cors())
app.set('json spaces', 2)

//routes
app.use('/getAllUsers', require('./routes/getAllUsers'))
app.use('/getUserById', require('./routes/getUserById'))
app.use('/getUserBySession', require('./routes/getUserBySession'))
app.use('/signup', require('./routes/signup'))
app.use('/signin', require('./routes/signin'))
app.use('/verifySession', require('./routes/verifySession'))
app.use('/logout', require('./routes/logout'))
app.use('/editProfile', require('./routes/editProfile'))
app.use('/editPassword', require('./routes/editPassword'))

//mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ping-ponguin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.set('useFindAndModify', false)
