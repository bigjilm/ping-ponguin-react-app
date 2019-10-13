const router = require('express').Router()
const User = require('../models/User')

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json(err))
})

module.exports = router
