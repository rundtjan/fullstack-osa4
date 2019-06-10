const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res, next) => {
  try{
    const blogs = await Blog.find({})
    res.json(blogs)
  } catch (exception){
    next(exception)
  }
  })
  
  blogRouter.post('/', async (req, res, next) => {
    if (!req.body.likes){
      req.body.likes = 0;
    }
    
    try{
      const blog = new Blog(req.body)
      const result = await blog.save()
      console.log("blog saved...")
      res.status(201).json(result)
    } catch (exception){
      console.log("kommer så här långt")
      next(exception)
    }

  })

  blogRouter.delete('/:id', async (req, res, next) => {
    try {
      const result = await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
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