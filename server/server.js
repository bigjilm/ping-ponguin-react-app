const express = require('express')
const http = require('http')
const cors = require('cors')
const app = express()
const server = http.createServer(app)

server.listen(3333, () => console.log('Server ready on port 3333'))

//middleware
app.use(express.json())
app.use(cors())
app.set('json spaces', 2)

// Socket.io
const io = require('socket.io')(server)
io.on('connection', socket => {
  console.log('a user connected')
  socket.on('disconnect', () => {
    console.log('User Disconnected')
  })
  socket.on('example_message', msg => {
    console.log('message:', msg)
    io.emit('message', msg)
  })
})

//routes
app.use('/getAllUsers', require('./routes/getAllUsers'))
app.use('/getUser', require('./routes/getUser'))
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
