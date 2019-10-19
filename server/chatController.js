const socket_io = require('socket.io')

const chatController = server => {
  const io = socket_io(server)
  io.on('connection', socket => {
    console.log('a user connected', socket.id)
    socket.on('disconnect', () => {
      console.log('User Disconnected')
    })
    socket.on('example_message', msg => {
      console.log('message:', msg)
      io.emit('message', msg)
    })
  })
}

module.exports = chatController
