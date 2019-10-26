const router = require('express').Router()
const UserSession = require('../../models/UserSession')

router.get('/', (req, res) => {
  const { token } = req.query

  UserSession.find({
    _id: token,
    isDeleted: false,
  })
    .then(sessions => {
      if (sessions.length !== 1) {
        return res.json({
          success: false,
          message: 'No session exists',
        })
      } else {
        return res.json({
          success: true,
          message: 'Logged in',
        })
      }
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router
