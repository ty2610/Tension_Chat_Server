var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var pageIndexRouter = require('./routes/index');
var pageMainRouter = require('./routes/login');
var chatRoomRouter = require('./routes/chat');
var loginSwitchRouter = require('./routes/loginSwitch');
var getMessageRouter = require('./routes/getMessage');
var sendMessageRouter = require('./routes/sendMessage');
var getUserColor = require('./routes/getUserColor');

//Added the getChatRooms router
var getChatRooms = require('./routes/getChatRooms');
var removeRoom = require('./routes/removeRoom');
var createRoom = require('./routes/createRoom');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pageIndexRouter);
app.use('/login', pageMainRouter);
app.use('/chat', chatRoomRouter);
app.use('/loginSwitch', loginSwitchRouter);
app.use('/getMessages', getMessageRouter);
app.use('/sendMessage', sendMessageRouter);
app.use('/getUserColor', getUserColor);

//Added the getChatRooms router
app.use('/getChatRooms',getChatRooms);

//Added the create/remove room routes
app.use('/removeRoom',removeRoom);
app.use('/createRoom',createRoom);


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
    //NEED TO ADD ERROR.HTML PAGE TO SHOW
    //res.render('error');
});


module.exports = app;
