const router = require('express').Router()
const UserSession = require('../../models/UserSession')

router.get('/', (req, res) => {
  const { token } = req.query

  UserSession.findByIdAndUpdate(token, {
    isDeleted: true,
  })
    .then(() =>
      res.json({
        success: true,
        message: 'Logged out',
      })
    )
    .catch(err => res.status(400).json(err))
})

module.exports = router
