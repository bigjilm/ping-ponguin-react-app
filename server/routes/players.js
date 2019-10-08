const router = require('express').Router()
const Player = require('../models/Player')
// let players = require('../data/playerData.json')

router.get('/', (req, res) => {
  Player.find()
    .then(players => res.json(players))
    .catch(err => res.json(err))
})

// router.get('/:id', (req, res) => {
//   Player.find({ id: req.params.id })
//     .then(cards => res.json(cards))
//     .catch(err => res.json(err))
// })

router.post('/', (req, res) => {
  Player.create(req.body)
    .then(newPlayer => res.json(newPlayer))
    .catch(err => res.json(err))
})

module.exports = router
