const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);

  const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: String,
    url: {type: String, required: true},
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