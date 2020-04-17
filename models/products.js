const mongoose = require('mongoose');

// Ques-3 (C)
const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "can't be blank"]
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  price: Number,
  size: {
    type: String,
    enum: ['s', 'm', 'l', 'xl', 'xxl'],
    default: 'm'
  },
  isDelete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// The last line mongoose.model('Product', ProductSchema); registers our schema with mongoose. 
// Our product model can then be accessed anywhere in our application by calling 
// mongoose.model('Product').
mongoose.model('Product', ProductSchema);