const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body
    if (body.password.length < 3){
      return res.status(400).json({error: 'password too short'})
    }
    const suola = 10
    const salasanaHash = await bcrypt.hash(body.password, suola)

    const user = new User({username: body.username,
      name: body.name,
      passwordHash: salasanaHash,
    })

    const uusiUser = await user.save()

    res.json(uusiUser)
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (req, res, next) => {
  try{
    const users = await User.find({})
    res.json(users.map(user => user.toJSON()))
  } catch (exception){
    next(exception)
  }
  })

  module.exports = usersRouter