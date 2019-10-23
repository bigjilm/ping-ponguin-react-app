const router = require('express').Router()
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
  } = req.body

  User.findById(id)
    .then(user => {
      if (!(user.email === email)) {
        User.find({ email: email })
          .then(previousUsers => {
            if (previousUsers.length > 0) {
              return res.json({
                success: false,
                message: 'Account already exists',
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

      user
        .save()
        .then(() => {
          res.json({
            success: true,
            message: 'Profile edited',
          })
        })
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router
