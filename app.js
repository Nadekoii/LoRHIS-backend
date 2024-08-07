/* Variables */
var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var { setupWebSocketServer } = require('./routes/websocket');

/* Routers */
var indexRouter = require('./routes/index');
var downlinkRouter = require('./routes/downlink');
var uplinkRouter = require('./routes/uplink');

/* App */
const app = express();
const server = http.createServer(app);

/* View Engine Setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

/* WebSocket Server Setup & MQTT Integration */
setupWebSocketServer(server);
server.listen(process.env.PORT || 3001, '0.0.0.0',() => {
  console.log(`Server running on port ${server.address().port}`);
});

/* Middleware */
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Routes */
app.use('/', indexRouter);
app.use('/api', downlinkRouter);
app.use('/api', uplinkRouter);


/* Error Handling */
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
