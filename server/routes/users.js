const router = require('express').Router()
const User = require('../models/User')

router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(404).json(err))
})

// router.post('/', (req, res) => {
//   User.create(req.body)
//     .then(newUser => res.json(newUser))
//     .catch(err => res.status(400).json(err))
// })

router.post('/signup', (req, res) => {
  //Pfad???
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
        return res.send({
          success: false,
          message: 'Error: Server error',
        })
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
          return res.send({
            success: false,
            message: 'Error: Server error',
          })
        }
        return res.send({
          success: true,
          message: 'Signed up',
        })
      })
    }
  )
})

module.exports = router
