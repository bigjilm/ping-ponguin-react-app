const router = require('express').Router()
const User = require('../models/User')

router.delete('/', (req, res) => {
  const { id } = req.query

  User.findByIdAndUpdate(id, { isDeleted: true }, { new: true })
    .then(user => {
      setTimeout(() => user.remove(), 15000)
      return res.json({
        success: true,
        message: 'User ' + user.name + ' marked for deletion',
      })
    })
    .catch(err => res.json(err))

  //   User.findByIdAndDelete(id)
  //     .then(user =>
  //       res.json({
  //         success: true,
  //         message: 'User ' + user.name + ' deleted',
  //       })
  //     )
  //     .catch(err => res.json(err))
})

module.exports = router
