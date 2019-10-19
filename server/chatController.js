const mongoose = require('mongoose')
const Channel = require('./models/Channel')
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
  let currentChannel
  io.on('connection', socket => {
    console.log(USER_CONNECTED, socket.id)
    socket.on(USER_DISCONNECTED, () => {
      console.log('User Disconnected')
    })

    socket.on(CHAT_START, userIds => {
      userIds.sort()
      Channel.find({ members: userIds })
        .then(channels => {
          if (channels.length > 1) {
            console.error('Error: More than one channel for a user couple')
          } else if (channels.length === 0) {
            Channel.create({
              members: userIds,
            })
              .then(channel => {
                currentChannel = channel
                console.log('Channel created', currentChannel)
              })
              .catch(err => console.error(err))
          } else {
            currentChannel = channels[0]
            console.log('Channel found', currentChannel)
          }
        })
        .catch(err => console.error(err))
    })

    socket.on(MESSAGE_SENT, msg => {
      console.log('message:', msg)
      io.emit(MESSAGE_RECEIVED, msg)
    })
  })
}

module.exports = chatController
