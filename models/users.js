const mongoose = require('mongoose');

// define the User schema with any needed validations
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  },
  firstName: {
    type: String,
    required: [true, "can't be blank"]
  },
  lastName: {
    type: String,
    required: [true, "can't be blank"]
  },
  addresses: [{
    address: String,
    city: String,
    postCode: String
  }],
  userName: String,
  isDelete: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

// Ques-3 (B)
UserSchema.pre("save", function (next) {
  this.userName = this.firstName + ' ' + this.lastName;
  next()
})

// The last line mongoose.model('User', UserSchema); registers our schema with mongoose. 
// Our user model can then be accessed anywhere in our application by calling 
// mongoose.model('User').
mongoose.model('User', UserSchema);