const router = require('express').Router()
let players = require('../data/playerData.json')

router.get('/', (req, res) => {
  res.json(players)
})

router.post('/', (req, res) => {
  const newPlayer = req.body
  players.push(newPlayer)
  res.json(newPlayer)
})

module.exports = router
