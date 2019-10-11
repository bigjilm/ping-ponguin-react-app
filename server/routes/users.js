const router = require('express').Router()
const User = require('../models/User')
const UserSession = require('../models/UserSession')

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json(err))
})

router.post('/signup', (req, res) => {
  const { name, password } = req.body
  let { email } = req.body

  if (!name) {
    return res.send({
      success: false,
      message: 'Error: name must not be blank',
    })
  }
  if (!email) {
    return res.send({
      success: false,
      message: 'Error: email must not be blank',
    })
  }
  if (!password) {
    return res.send({
      success: false,
      message: 'Error: password must not be blank',
    })
  }

  //email validation to do
  email = email.toLowerCase()

  User.find(
    {
      email: email,
    },
    (err, previousUsers) => {
      if (err) {
        sendServerError(res)
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exists',
        })
      }
      const newUser = new User()

      newUser.email = email
      newUser.name = name
      newUser.password = newUser.generateHash(password)
      newUser.save((err, user) => {
        if (err) {
          sendServerError(res)
        }
        return res.send({
          success: true,
          message: 'Signed up',
        })
      })
    }
  )
})

router.post('/signin', (req, res) => {
  const { password } = req.body
  let { email } = req.body
  email = email.toLowerCase()

  if (!email) {
    return res.send({
      success: false,
      message: 'Error: email must not be blank',
    })
  }
  if (!password) {
    return res.send({
      success: false,
      message: 'Error: password must not be blank',
    })
  }
  User.find(
    {
      email: email,
    },
    (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error',
        })
      } else if (users.length !== 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid email',
        })
      }

      const user = users[0]
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Wrong password',
        })
      }
      const userSession = new UserSession()
      userSession.userId = user._id
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error',
          })
        } else {
          return res.send({
            success: true,
            message: 'Signed in',
            token: doc._id,
          })
        }
      })
    }
  )
})

router.get('/verify', (req, res) => {
  const { token } = req.query

  //sends server error when token does not have the same length as _id. Why???
  //https://github.com/Automattic/mongoose/issues/1959
  //Check length or just leave it throwing the server error???
  UserSession.find(
    {
      _id: token,
      isDeleted: false,
    },
    (err, sessions) => {
      if (err) {
        sendServerError(res)
      } else if (sessions.length !== 1) {
        return res.send({
          success: false,
          message: 'Error: No session exists',
        })
      } else {
        return res.send({
          success: true,
          message: 'You are logged in',
        })
      }
    }
  )
})

//logout mit GET request??? Nicht mit PATCH?
router.get('/logout', (req, res) => {
  const { token } = req.query

  //sends server error when token does not have the same length as _id. Why???
  UserSession.findByIdAndUpdate(
    token,
    {
      isDeleted: true,
    },
    (err, sessions) => {
      if (err) {
        sendServerError(res)
      } else {
        return res.send({
          success: true,
          message: 'You are logged out',
        })
      }
    }
  )
})

function sendServerError(res) {
  return res.send({
    success: false,
    message: 'Error: Server error',
  })
}

module.exports = router
