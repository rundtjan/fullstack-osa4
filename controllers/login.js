const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({username: body.username})
  console.log(user)
  const oikeaSalasana = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && oikeaSalasana)) {
    return res.status(401).json({
      error: 'wrong username or password'
    })
  }

  const tokeniaVarten = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(tokeniaVarten, process.env.SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
