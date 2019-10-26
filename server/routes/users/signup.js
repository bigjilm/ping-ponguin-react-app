const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../../models/User')

router.post('/', (req, res) => {
  let { email } = req.body
  //email validation to do
  email = email.toLowerCase()

  User.find({
    email: email,
  })
    .then(previousUsers => {
      if (previousUsers.length) {
        return res.json({
          success: false,
          message: 'Account already exists',
        })
      } else {
        const { password } = req.body
        let encryptedPassword

        if (password) {
          encryptedPassword = generateHash(password)
        } else {
          //empty password will be rejected by mongoDB
          encryptedPassword = null
        }

        User.create({ ...req.body, password: encryptedPassword })
          .then(() => {
            res.json({
              success: true,
              message: 'Signed up',
            })
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

function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

module.exports = router
