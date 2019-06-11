const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (req, res, next) => {
  try{
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
    res.json(blogs)
  } catch (exception){
    next(exception)
  }
  })
  
  blogRouter.post('/', async (req, res, next) => {
    console.log("reaction")
    if (!req.body.likes){
      req.body.likes = 0;
    }


    try{
      const decryptToken = jwt.verify(req.token, process.env.SECRET)
      if (!req.token || !decryptToken.id) {return res.status(401).json({ error: 'et taida olla kirjautunut' })}
      
      const user = await User.findById(decryptToken.id)
      
      const blog = new Blog({
        title: req.body.title,
        _id: req.body._id,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes,
        __v: req.body.__v,
        user: user._id
      })
      const result = await blog.save()
      user.blogs = user.blogs.concat(result._id)
      console.log("user: ", user)
      await user.save()
      console.log("user and blogblog saved...")
      res.status(201).json(result)
    } catch (exception){
      //console.log("kommer så här långt")
      next(exception)
    }

  })

  blogRouter.delete('/:id', async (req, res, next) => {
    try {
      const decryptToken = jwt.verify(req.token, process.env.SECRET)
      if (!req.token || !decryptToken.id) {return res.status(401).json({ error: 'et taida olla kirjautunut' })}
      
      const user = await User.findById(decryptToken.id)
      const blog = await Blog.findById(req.params.id)
      if (blog.user.toString() === user._id.toString())
      {const result = await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()} else {
      res.status(401).json({ error: 'et taida olla blogin laatija' })
      }
    } catch (exception){
      next(error)
    }
  })

  blogRouter.put('/:id', async (req, res, next) => {
    try {
    const blog = await Blog.findById(req.params.id)
    blog.likes = blog.likes + 1;
    const newblog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    res.json(newblog.toJSON())
    } catch (exception){
      next(exception)
    }
  })

  module.exports = blogRouter