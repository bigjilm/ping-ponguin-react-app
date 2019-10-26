const router = require('express').Router()
const Message = require('../../models/Message')

router.get('/', (req, res) => {
  const { channelId } = req.query
  Message.find({ channel: channelId })
    .then(messages => {
      res.json(messages)
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router
