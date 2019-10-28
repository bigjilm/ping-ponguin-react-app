const router = require('express').Router()
const User = require('../models/User')

router.delete('/', (req, res) => {
  const { userId } = req.query
  User.findByIdAndDelete(userId)
    .then(user =>
      res.json({
        success: true,
        message: 'User ' + user.name + ' deleted',
      })
    )
    .catch(err => res.json(err))
})

module.exports = router
