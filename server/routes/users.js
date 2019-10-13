const router = require('express').Router()
const User = require('../models/User')

router.get('/', (req, res) => {
  User.find()
    .then(users => {
      const usersData = users
        .filter(user => !user.isDeleted)
        .map(user => ({
          _id: user._id,
          name: user.name,
          residence: user.residence,
          abilityLeft: user.abilityLeft,
          abilityRight: user.abilityRight,
          imageURL: user.imageURL,
        }))
      res.json(usersData)
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router
