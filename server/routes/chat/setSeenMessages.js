const router = require('express').Router()
const Message = require('../../models/Message')

router.patch('/', (req, res) => {
  const { channelId } = req.query
  const { currentUserId } = req.body
  Message.find({ channel: channelId })
    .then(messages => {
      messages
        .filter(message => message.author.toString() !== currentUserId)
        .forEach(message => {
          message.seen = true
          message.save().catch(err => res.status(404).json(err))
        })
    })
    .then(() =>
      res.json({
        success: true,
        message: 'All messages set to seen',
      })
    )
    .catch(err => res.status(404).json(err))
})

module.exports = router
