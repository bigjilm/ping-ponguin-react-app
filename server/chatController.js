const socket_io = require('socket.io')
const {
  USER_CONNECTED,
  USER_DISCONNECTED,
  CHAT_START,
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  TYPING,
} = require('../src/events')

const chatController = server => {
  const io = socket_io(server)
  io.on('connection', socket => {
    console.log(USER_CONNECTED, socket.id)
    socket.on(USER_DISCONNECTED, () => {
      console.log('User Disconnected')
    })
    socket.on(MESSAGE_SENT, msg => {
      console.log('message:', msg)
      io.emit(MESSAGE_RECEIVED, msg)
    })
  })
}

module.exports = chatController
