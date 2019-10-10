const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  residence: { type: String, required: true },
  abilityLeft: { type: String, required: true },
  abilityRight: { type: String, required: true },
  imageURL: { type: String },
  email: { type: String },
  password: { type: String },
  isDeleted: { type: Boolean, default: false },
})

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('User', userSchema)

module.exports = User
