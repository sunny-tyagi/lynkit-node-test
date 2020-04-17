const mongoose = require('mongoose');

// import the Mongoose models
require('../models/categories');
require('../models/users');
require('../models/products');

// It is common database config file for connection and models require.
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://sunnylynkit:sunnylynkit@sunny-wljue.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (result) => {
  console.log('DB connected!!');
}, () => {
  console.log('Unable to connect DB');
});