const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  residence: { type: String, required: true },
  abilityLeft: { type: String, required: true },
  abilityRight: { type: String, required: true },
  imageURL: { type: String },
})

const User = mongoose.model('User', userSchema)

module.exports = User
