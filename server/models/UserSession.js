const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: -1,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

const UserSession = mongoose.model('UserSession', userSessionSchema)

module.exports = UserSession
