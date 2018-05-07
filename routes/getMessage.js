var express = require('express');
var router = express.Router();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();

router.post('/', function(req, res, next) {
    var db = new sqlite3.Database("chat.sqlite3");

    var chatRoomNumber = req.body.chatRoomNumber;

    var query = "SELECT * FROM messages AS m INNER JOIN user AS u ON m.userID = u.ID WHERE roomNumber = " + chatRoomNumber + " ORDER BY timestamp ASC;";

    db.all(query, (err, result) =>{
        if(err !== null){
            res.status(500).send(err);
        } else {
            var data = JSON.stringify(result);
            res.send(data);
        }
        db.close();
    });
});

module.exports = router;