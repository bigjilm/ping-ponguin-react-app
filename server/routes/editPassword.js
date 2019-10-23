const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.patch('/', (req, res) => {
  const { id } = req.query
  const { oldPassword, newPassword, newPasswordRepeat } = req.body

  let newPasswordEncrypted

  if (!(newPassword === newPasswordRepeat)) {
    res.json({
      success: false,
      message: 'New passwords dont match',
    })
  } else {
    if (newPassword) {
      newPasswordEncrypted = generateHash(newPassword)
    } else {
      //empty password will be rejected by mongoDB
      newPasswordEncrypted = null
    }
  }

  User.findById(id)
    .then(user => {
      if (!user.validPassword(oldPassword)) {
        res.json({
          success: false,
          message: 'Old password wrong',
        })
      } else {
        user.password = newPasswordEncrypted
        user
          .save()
          .then(() =>
            res.json({
              success: true,
              message: 'New password saved',
            })
          )
          .catch(err => {
            console.error(err)
            res.status(400).json(err)
          })
      }
    })
    .catch(err => res.status(400).json(err))
})

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

module.exports = router
