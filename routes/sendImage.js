var express = require('express');
var multer = require('multer');
var bodyparser = require('body-parser');
var fs = require("fs");
var router = express.Router();
var path = require('path');
var sqlite3 = require('sqlite3').verbose();

var imgUrl = "";
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function(req, file, callback) {
        imgUrl = file.fieldname + "_" + Date.now() + "_" + file.originalname;
        callback(null, imgUrl.replace(/\s/g, ''));
    }
});
var upload = multer({
    storage: storage
}).any();

router.post('/', function(req, res, next) {
    var db = new sqlite3.Database("chat.sqlite3");

    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end(imgUrl.replace(/\s/g, ''));
    });
    //
    // var alias = "";
    // var b64 = "";
    // var size = "";
    // var query = "";
    // upload(req, res, function (err) {
    //     if(err){
    //         console.log(err);
    //         return res.end("Error");
    //     } else {
    //         var item = req.files[0];
    //         alias =  Math.random().toString(36).substr(4);
    //         size = item.size;
    //         b64 = new Buffer(fs.readFileSync(item.path)).toString("base64");
    //         b64 = "data:" + item.mimetype + ";base64," + b64;
    //         var ext = item.mimetype.substr(6);
    //         fs.writeFile("images/"+alias + "." + ext, item, function(err) {
    //             if(err) {
    //                 return console.log(err);
    //             }
    //
    //             console.log("The file was saved!");
    //         });
    //
    //         fs.unlink(item.path);
    //         // query = "INSERT INTO images (alias, size, b64) VALUES ('"+alias+"','"+size+"','"+b64+"');";
    //         // db.all(query, (err, result) =>{
    //         //     if(err !== null){
    //         //         res.status(500).send(err);
    //         //     } else {
    //         //         res.status(200).send({alias:alias});
    //         //     }
    //         //     db.close();
    //         // });
    //     }
    // });
});

module.exports = router;