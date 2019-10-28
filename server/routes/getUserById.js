const router = require('express').Router()
const User = require('../models/User')

router.get('/', (req, res) => {
  const { id } = req.query
  User.findById(id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json(err))
})

module.exports = router
