const router = require('express').Router()
let players = require('../data/playerData.json')

router.get('/', (req, res) => {
  res.json(players)
})

module.exports = router
