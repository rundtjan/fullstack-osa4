const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

const schema = mongoose.Schema({
  username: {type: String, minlength: 3, unique: true},
  name: String,
  passwordHash: String,
  blogs: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }],
})

schema.plugin(uniqueValidator);

schema.set('toJSON', {
  transform: (document, palautettu) => {
    palautettu.id = palautettu._id.toString()
    delete palautettu._id
    delete palautettu.__v
    delete palautettu.passwordHash
  }
})

module.exports = mongoose.model('User', schema)