const mongoose = require('mongoose');

// Ques-3 (C)
const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "can't be blank"]
  },
  isDelete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// The last line mongoose.model('Category', CategorySchema); registers our schema with mongoose. 
// Our category model can then be accessed anywhere in our application by calling 
// mongoose.model('Category').
mongoose.model('Category', CategorySchema);