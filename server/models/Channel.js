const mongoose = require('mongoose')
const Schema = mongoose.Schema

const channelSchema = new Schema({
  members: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    required: true,
  },
})

const Channel = mongoose.model('Channel', channelSchema)

module.exports = Channel
