const mongoose = require('mongoose')
const Channel = require('./models/Channel')
const Message = require('./models/Message')
const socket_io = require('socket.io')
const {
  USER_CONNECTED,
  USER_DISCONNECTED,
  CHAT_START,
  CHANNEL_SET,
  CHANNEL_LEAVE,
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  TYPING,
} = require('../src/events')

const chatController = server => {
  const io = socket_io(server)
  io.on('connection', socket => {
    console.log(USER_CONNECTED, socket.id)

    socket.on('disconnect', () => {
      console.log(USER_DISCONNECTED)
    })

    socket.on(CHAT_START, userIds => {
      userIds.sort()
      Channel.find({ members: userIds })
        .then(channels => {
          if (channels.length > 1) {
            console.error('Error: More than one channel for a user couple')
          } else {
            let currentChannel
            if (channels.length === 0) {
              Channel.create({
                members: userIds,
              })
                .then(channel => {
                  currentChannel = channel._id
                })
                .catch(err => console.error(err))
            } else {
              currentChannel = channels[0]._id
            }
            socket.join(currentChannel)
            io.to(currentChannel).emit(CHANNEL_SET, currentChannel)
          }
        })
        .catch(err => console.error(err))
    })

    socket.on(CHANNEL_LEAVE, currentChannel => {
      socket.leave(currentChannel)
      console.log('Left channel', currentChannel)
    })

    socket.on(MESSAGE_SENT, msg => {
      console.log('message:', msg)
      Message.create({
        body: msg.body,
        author: msg.author,
        channel: msg.channel,
      })
        .then(msg => io.emit(MESSAGE_RECEIVED, msg))
        .catch(err => console.error(err))
    })
  })
}

module.exports = chatController
