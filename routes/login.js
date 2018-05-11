var express = require('express');
var router = express.Router();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();

router.post('/create', function(req, res, next) {
    var db = new sqlite3.Database("chat.sqlite3");
    var username = req.body.username;
    var userColor = req.body.userColor;

    username = username.replace(/[\[\]();]/g, "");
    userColor = userColor.replace(/[\[\]();]/g, "");

    var query
    //var query = "INSERT OR REPLACE INTO user(username,color) VALUES('" + username + "','" + userColor + "');";
    var query = "SELECT * FROM user WHERE username = '" + username + "';";

    db.all(query, (err, result) =>{
        if(err !== null){
            res.status(500).send(err);
        } else if(result.length===0) {
            query = "INSERT OR REPLACE INTO user(username,color) VALUES('" + username + "','" + userColor + "');";
            db.run(query, (err) =>{
                if(err !== null){
                    res.status(500).send(err);
                } else {
                    res.sendStatus(200);
                }
                db.close();
            });
        } else {
            query = "UPDATE user SET color= '" + userColor + "' WHERE username= '" + username + "';";
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

router.post('/enter', function(req, res, next) {
    var db = new sqlite3.Database("chat.sqlite3");
    var username = req.body.username;

    username = username.replace(/[\[\]();]/g, "");

    var query = "SELECT * FROM user WHERE username = '" + username + "';";

    db.all(query, (err, result) =>{
        if(err !== null){
            res.status(500).send(err);
        } else if(result.length===0) {
            res.status(500).send("The username entered does not exist");
        } else {
            var data = JSON.stringify(result);
            res.send(data);
        }
        db.close();
    });
});

module.exports = router;