const router = require('express').Router()
const User = require('../models/User')
const UserSession = require('../models/UserSession')

router.post('/', (req, res) => {
  const { password } = req.body
  let { email } = req.body
  email = email.toLowerCase()

  if (!email) {
    return res.json({
      success: false,
      message: 'Error: email must not be blank',
    })
  }
  if (!password) {
    return res.json({
      success: false,
      message: 'Error: password must not be blank',
    })
  }

  User.find({
    email: email,
  })
    .then(users => {
      if (users.length !== 1) {
        return res.json({
          success: false,
          message: 'Error: invalid email',
        })
      } else {
        const user = users[0]
        if (!user.validPassword(password)) {
          return res.json({
            success: false,
            message: 'Error: wrong password',
          })
        } else {
          UserSession.create({
            userId: user._id,
          })
            .then(user => {
              res.json({
                success: true,
                message: 'Signed in',
                token: user._id,
              })
            })
            .catch(err => res.status(400).json(err))
        }
      }
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router
