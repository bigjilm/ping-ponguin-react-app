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
app.use('/getAllUsers', require('./routes/users/getAllUsers'))
app.use('/getUserById', require('./routes/users/getUserById'))
app.use('/getUserBySession', require('./routes/users/getUserBySession'))
app.use('/signup', require('./routes/users/signup'))
app.use('/signin', require('./routes/users/signin'))
app.use('/verifySession', require('./routes/users/verifySession'))
app.use('/logout', require('./routes/users/logout'))
app.use('/editProfile', require('./routes/users/editProfile'))
app.use('/editPassword', require('./routes/users/editPassword'))
app.use('/getChannels', require('./routes/chat/getChannels'))
app.use('/getMessages', require('./routes/chat/getMessages'))
app.use('/setSeenMessages', require('./routes/chat/setSeenMessages'))

//mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ping-ponguin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
mongoose.set('useFindAndModify', false)
