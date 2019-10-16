const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.patch('/', (req, res) => {
  const { id } = req.query
  const { password } = req.body
  let encryptedPassword

  if (password) {
    encryptedPassword = generateHash(password)
  } else {
    encryptedPassword = ''
  }

  User.findByIdAndUpdate(id, {
    ...req.body,
    password: encryptedPassword,
  })
    .then(user => {
      res.json({
        success: true,
        message: 'Your profile has been edited',
      })
    })
    .catch(err => res.status(400).json(err))
})

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

module.exports = router
