const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.post('/', (req, res) => {
  let { email } = req.body
  //email validation to do
  email = email.toLowerCase()

  User.find({
    email: email,
  })
    .then(previousUsers => {
      if (previousUsers.length > 0) {
        return res.json({
          success: false,
          message: 'Error: account already exists',
        })
      } else {
        const { password } = req.body
        let encryptedPassword

        if (password) {
          encryptedPassword = generateHash(password)
        } else {
          encryptedPassword = ''
        }

        User.create({ ...req.body, password: encryptedPassword })
          .then(newUser => {
            res.json(newUser)
          })
          .catch(err => {
            res.status(400).json(err)
          })
      }
    })
    .catch(err => {
      res.status(400).json(err)
    })
})

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

module.exports = router
