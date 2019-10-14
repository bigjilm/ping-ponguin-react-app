const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const UserSession = require('../models/UserSession')

router.patch('/', (req, res) => {
  const { token } = req.query
  const { password } = req.body
  UserSession.findById(token).then(session => {
    const userId = session.userId
    User.findByIdAndUpdate(userId, {
      ...req.body,
      password: generateHash(password),
    })
      .then(() => {
        res.json({
          success: true,
          message: 'Your profile has been edited',
        })
      })
      .catch(err => res.status(400).json(err))
  })
})

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

module.exports = router
