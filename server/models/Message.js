const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: 'Channel',
      required: true,
    },
    seen: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { toJSON: { virtuals: true } }
)

messageSchema.virtual('timestamp').get(function() {
  return this._id.getTimestamp()
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message
