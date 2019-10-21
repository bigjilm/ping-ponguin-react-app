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
} = require('../src/events')

function chatController(server) {
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
            if (channels.length === 0) {
              Channel.create({
                members: userIds,
              })
                .then(channel => {
                  const currentChannel = channel._id
                  startChannel(currentChannel)
                })
                .catch(err => console.error(err))
            } else {
              const currentChannel = channels[0]._id
              startChannel(currentChannel)
            }
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
        .then(msg => io.to(msg.channel).emit(MESSAGE_RECEIVED, msg))
        .catch(err => console.error(err))
    })

    function startChannel(channel) {
      socket.join(channel)
      Message.find({ channel: channel })
        .then(messages => {
          const channelData = { channel: channel, messages: messages }
          io.to(channel).emit(CHANNEL_SET, channelData)
        })
        .catch()
    }
  })
}

module.exports = chatController
