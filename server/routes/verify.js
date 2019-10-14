const router = require('express').Router()
const UserSession = require('../models/UserSession')

router.get('/', (req, res) => {
  const { token } = req.query

  //sends server error when token does not have the same length as _id. Why???
  //https://github.com/Automattic/mongoose/issues/1959
  //Check length or just leave it throwing the server error???
  UserSession.find({
    _id: token,
    isDeleted: false,
  })
    .then(sessions => {
      if (sessions.length !== 1) {
        return res.json({
          success: false,
          message: 'Error: no session exists',
        })
      } else {
        return res.json({
          success: true,
          message: 'You are logged in',
        })
      }
    })
    .catch(err => res.status(400).json(err))
})

module.exports = router
