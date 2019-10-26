const router = require('express').Router()
const Channel = require('../../models/Channel')

router.get('/', (req, res) => {
  const { userId } = req.query
  Channel.find({ members: userId })
    .then(channels => {
      console.log('HERE 1')
      res.json(channels)
    })
    .catch(err => {
      console.log('HERE 2')
      res.status(404).json(err)
    })
})

module.exports = router
