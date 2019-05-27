const mongoose = require('mongoose')

  const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })


blogSchema.set('toJSON', {
transform: (document, palautettuObject) => { 
palautettuObject.id = palautettuObject._id
    delete palautettuObject._id
    delete palautettuObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)