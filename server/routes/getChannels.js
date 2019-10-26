const router = require('express').Router()
const Channel = require('../models/Channel')

router.get('/', (req, res) => {
  const { userId } = req.query
  Channel.find({ members: userId })
    .then(channels => {
      res.json(channels)
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router
