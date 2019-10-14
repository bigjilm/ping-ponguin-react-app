const router = require('express').Router()
const User = require('../models/User')
const UserSession = require('../models/UserSession')

router.get('/', (req, res) => {
  const { token } = req.query
  UserSession.findById(token)
    //error handling to do
    .then(session => {
      User.findById(session.userId)
        .then(user => {
          res.json(user)
        })
        .catch(err => res.status(404).json(err))
    })
    .catch(err => res.status(404).json(err))
})

module.exports = router
