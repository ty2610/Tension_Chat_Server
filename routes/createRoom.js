var express = require('express');
var router = express.Router();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();
var url = require('url');
var http = require('http');

//TODO: Why isnt this working...
router.post('/', function(req, res, next) {
    var db = new sqlite3.Database("chat.sqlite3");

    var room_name = req.param('room_name');
    var query = "INSERT INTO rooms(name) VALUES('" + room_name + "')";

    db.serialize(function () {
        db.all(query, (err, result) =>{
            if(err !== null){
                res.status(500).send(err);
            } else {
                //res.send("success");
                console.log("added room");
            }
            //db.close();
        });

        query = "SELECT * FROM rooms WHERE name = '"+room_name+"';";
        db.all(query, (err, result) =>{
            if(err !== null){
                res.status(500).send(err);
            } else {
                console.log("RESULT: " + result[0].ID);
                res.send(200,result[0].ID);
            }
            db.close();
        });

    });
    //Testing to get the response.
});

module.exports = router;
