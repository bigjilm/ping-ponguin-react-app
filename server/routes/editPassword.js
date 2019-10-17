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
      message: 'The new passwords dont match',
    })
  } else {
    if (newPassword) {
      newPasswordEncrypted = generateHash(newPassword)
    } else {
      newPasswordEncrypted = ''
    }
  }

  User.findById(id)
    .then(user => {
      if (!user.validPassword(oldPassword)) {
        res.json({
          success: false,
          message: 'The old password is wrong',
        })
      } else {
        console.log(newPasswordEncrypted)
        user.password = newPasswordEncrypted
        user
          .save()
          .then(() =>
            res.json({
              success: true,
              message: 'Your new password has been saved',
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
