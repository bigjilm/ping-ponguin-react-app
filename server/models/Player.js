const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  residence: { type: String, required: true },
  abilityLeft: { type: String, required: true },
  abilityRight: { type: String, required: true },
  imageURL: { type: String },
})

const Player = mongoose.model('Player', playerSchema)

module.exports = Player
