const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const UserSession = require('../models/UserSession')

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json(err))
})

router.post('/signup', (req, res) => {
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

router.post('/signin', (req, res) => {
  const { password } = req.body
  let { email } = req.body
  email = email.toLowerCase()

  if (!email) {
    return res.json({
      success: false,
      message: 'Error: email must not be blank',
    })
  }
  if (!password) {
    return res.json({
      success: false,
      message: 'Error: password must not be blank',
    })
  }

  User.find({
    email: email,
  })
    .then(users => {
      if (users.length !== 1) {
        return res.json({
          success: false,
          message: 'Error: invalid email',
        })
      } else {
        const user = users[0]
        if (!user.validPassword(password)) {
          return res.json({
            success: false,
            message: 'Error: wrong password',
          })
        } else {
          UserSession.create({
            userId: user._id,
          })
            .then(user => {
              res.json({
                success: true,
                message: 'Signed in',
                token: user._id,
              })
            })
            .catch(err => res.status(400).json(err))
        }
      }
    })
    .catch(err => res.status(400).json(err))
})

router.get('/verify', (req, res) => {
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

router.get('/logout', (req, res) => {
  const { token } = req.query

  UserSession.findByIdAndUpdate(token, {
    isDeleted: true,
  })
    .then(() =>
      res.json({
        success: true,
        message: 'You are logged out',
      })
    )
    .catch(err => res.status(400).json(err))
})

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

module.exports = router
