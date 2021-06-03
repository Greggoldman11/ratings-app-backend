// bring in mongoose for the schema
const mongoose = require('mongoose')

// make a new Schema
const ratingSchema = new mongoose.Schema({
  // title
  name: {
    // what type of data is this?
    type: String, // <--- don't forget the comma
    required: true
  }, // <--- don't forget the comma
  // category
  category: {
    // what type of data is this?
    type: String, // <--- don't forget the comma
    required: true
  }, // <--- don't forget the comma
  // notes
  notes: {
    // what type of data is this?
    type: String, // <--- don't forget the comma
    required: true
  }, // <--- don't forget the comma
  // rating
  rating: {
    // what type of data is this?
    type: Number, // <--- don't forget the comma
    required: true
  }, // <--- don't forget the comma
  // owner
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  // timestamps
  timestamps: true
  // other virtuals for V2
})



// export the model
module.exports = mongoose.model('Rating', ratingSchema)
