var createError = require('http-errors');
var express = require('express');
var axios = require('axios');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

/* Downlink API */
app.post('/sendInput', async (req, res) => {
  const { userInput } = req.body;
  if (!userInput) {
    return res.status(400).json({ message: 'Input cannot be empty' });
  }
  try {
    const downlinkConfig = {
      "deviceEUI": "fb8f56ec1b329a63",
      "confirmed": true,
      "data": Buffer.from(userInput).toString('base64'),
      "fPort": 1
    };
    const response = await axios.post('http://222.255.135.133:3004/api/downlink', downlinkConfig, {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiJmYjhmNTZlYzFiMzI5YTYzIiwiYXBwSUQiOiIzNyIsImVtYWlsIjoibG9uZy52dTY2MjBAZ21haWwuY29tIiwicGFzc3dvcmQiOiJMb25nMTIzQCIsImlhdCI6MTcxOTg5MjY5NH0.AtiBtwj4tfsxeVUqCJotwbHhmavw5isxCRpaM4pGDhQ'
      }
    });
    res.json({ message: 'Success', data: response.data });
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
      res.status(error.response.status).json({ message: error.response.data });
    } else if (error.request) {
      console.log(error.request);
      res.status(500).json({ message: 'No response from server' });
    } else {
      console.log('Error', error.message);
      res.status(500).json({ message: error.message });
    }
  }
});

/* Uplink API */
app.post('/refreshStatus', async (req, res) => {
  const headers = {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkZXZFVUkiOiJmYjhmNTZlYzFiMzI5YTYzIiwiYXBwSUQiOiIzNyIsImVtYWlsIjoibG9uZy52dTY2MjBAZ21haWwuY29tIiwicGFzc3dvcmQiOiJMb25nMTIzQCIsImlhdCI6MTcxOTg5MjY5NH0.AtiBtwj4tfsxeVUqCJotwbHhmavw5isxCRpaM4pGDhQ'
  };
  const uplinkConfig = {
    "limit": 1
  };
  try {
    const response = await axios.post('https://api.vngalaxy.vn/api/uplink/', uplinkConfig, {headers: headers});
    res.json({ status: true, data: response.data });
  } catch (error) {
    console.error('Error fetching status:', error);
    res.status(500).json({ status: false, message: 'Error fetching status' });
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
