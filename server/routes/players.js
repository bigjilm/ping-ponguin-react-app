const router = require('express').Router()
const Player = require('../models/Player')

router.get('/', (req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.status(404).json(err))
})

router.post('/', (req, res) => {
  Player.create(req.body)
    .then(newPlayer => res.json(newPlayer))
    .catch(err => res.status(400).json(err))
})

module.exports = router
