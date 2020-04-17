const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  errorhandler = require('errorhandler'),
  isProduction = 'production';

require('./db/connection');

// Create global app object
const app = express();
app.use(cors());

// Normal express config defaults
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// To serve static files such as images, CSS files, and JavaScript files, 
// use the express.static built-in middleware function in Express.
// More info: https://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/public'));

if (!isProduction) {
  app.use(errorhandler());
}

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message
    }
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Listening on port ' + server.address().port);
});