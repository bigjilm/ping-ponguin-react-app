const Channel = require('./models/Channel')
const Message = require('./models/Message')
const socket_io = require('socket.io')
const {
  USER_CONNECTED,
  USER_DISCONNECTED,
  CHAT_START,
  CHANNEL_SET,
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
            console.error('More than one channel for a user couple')
          } else {
            if (channels.length === 0) {
              Channel.create({
                members: userIds,
              })
                .then(channel => {
                  const currentChannelId = channel._id
                  startChannel(currentChannelId)
                })
                .catch(err => console.error(err))
            } else {
              const currentChannelId = channels[0]._id
              startChannel(currentChannelId)
            }
          }
        })
        .catch(err => console.error(err))
    })

    socket.on(MESSAGE_SENT, msg => {
      Message.create({
        body: msg.body,
        author: msg.author,
        channel: msg.channel,
      })
        .then(msg => io.to(msg.channel).emit(MESSAGE_RECEIVED, msg))
        .catch(err => console.error(err))
    })

    function startChannel(channelId) {
      socket.join(channelId)
      Message.find({ channel: channelId })
        .then(messages => {
          const channelData = { channel: channelId, messages: messages }
          io.to(channelId).emit(CHANNEL_SET, channelData)
        })
        .catch(console.error)
    }
  })
}

module.exports = chatController
