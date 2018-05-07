var express = require('express');
var router = express.Router();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();

router.post('/', function(req, res, next) {
    var db = new sqlite3.Database("chat.sqlite3");

    var chatRoomNumber = req.body.chatRoomNumber;
    var message = req.body.message;
    var username = req.body.username;

    //var query = "INSERT INTO messages(roomNumber,message,userID) VALUES(" + chatRoomNumber + "," + message + "," + ;
    var query = "SELECT * FROM user WHERE username = '" + username + "';";
    db.all(query, (err, result) =>{
        if(err !== null){
            res.status(500).send(err);
        } else {
            query = "INSERT INTO messages(roomNumber,message,userID) VALUES(" + chatRoomNumber + ",'" + message + "'," + result[0].ID +");";
            db.run(query, (err) =>{
                if(err !== null){
                    res.status(500).send(err);
                } else {
                    res.sendStatus(200);
                }
                db.close();
            });
        }
    });
});

module.exports = router;