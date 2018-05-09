var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var http = require('http');
var sqlite3 = require('sqlite3').verbose();

router.post('/', function(req, res, next) {
    var db = new sqlite3.Database("chat.sqlite3");
    var ID = req.param('id');
    console.log('id : ' + ID);

    db.serialize(function () {
        var query = "DELETE FROM rooms WHERE id='"+ID+"'";

        db.all(query, (err, result) =>{
            if(err !== null){
                res.status(500).send(err);
            } else {
                console.log("removed Room");
            }
        });
        query = "DELETE FROM messages WHERE roomNumber='"+ID+"'";
        db.all(query, (err, result) =>{
            if(err !== null){
                res.status(500).send(err);
            } else {
                console.log("removed Messages in room");
                res.send(ID);
            }
            db.close();
        });
    });

});

module.exports = router;
