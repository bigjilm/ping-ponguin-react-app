const mongoose = require('mongoose')

const Player = mongoose.model('Player', {
  name: String,
  residence: String,
  abilityLeft: String,
  abilityRight: String,
  imageURL: String,
})

module.exports = Player
