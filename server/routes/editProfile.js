const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.patch('/', (req, res) => {
  const { id } = req.query
  const {
    name,
    residence,
    abilityLeft,
    abilityRight,
    imageURL,
    email,
    password,
  } = req.body
  let encryptedPassword

  if (password) {
    encryptedPassword = generateHash(password)
  } else {
    encryptedPassword = ''
  }

  //Doppelte Email ausschließen

  User.findById(id)
    .then(user => {
      if (!(user.email === email)) {
        User.find({ email: email })
          .then(previousUsers => {
            if (previousUsers.length > 0) {
              return res.json({
                success: false,
                message: 'Error: account already exists',
              })
            }
          })
          .catch(err => res.status(400).json(err))
      }

      user.name = name
      user.residence = residence
      user.abilityLeft = abilityLeft
      user.abilityRight = abilityRight
      user.imageURL = imageURL
      user.email = email
      user.password = encryptedPassword

      user
        .save()
        .then(() => {
          res.json({
            success: true,
            message: 'Your profile has been edited',
          })
        })
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
})

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

module.exports = router
