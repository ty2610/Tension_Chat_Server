var express = require('express');
var router = express.Router();
var path = require('path');
var url = require('url');
var http = require('http');
var sqlite3 = require('sqlite3').verbose();

//TODO: Why isnt this working...
router.post('/', function(req, res, next) {
    var db = new sqlite3.Database("chat.sqlite3");

    //TODO: change query to remove the room with the ID -> var query = "SELECT * FROM rooms";
    //TODO: I think this is the correct ish ->

    var ID = req.param('id');
    console.log('id : ' + ID);

    var query = "DELETE FROM rooms WHERE id='"+ID+"'";

    db.all(query, (err, result) =>{
        if(err !== null){
            res.status(500).send(err);
        } else {
            res.send(ID);
        }
        db.close();
    });
    //Testing to get the response.
});

module.exports = router;
