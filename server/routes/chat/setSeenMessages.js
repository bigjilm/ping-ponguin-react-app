const router = require('express').Router()
const Message = require('../../models/Message')

router.get('/', (req, res) => {
  const { channelId } = req.query
  console.log('channelId', channelId)
  Message.find({ channel: channelId })
    .then(messages => {
      console.log(messages)
      messages.seen = true
      res.json({
        success: true,
        message: 'All messages set to seen',
      })
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router
