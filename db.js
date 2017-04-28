/**
 * Created by User on 2017-04-28.
 */
var assert = require("assert");

var url = 'mongodb://localhost:27017/goose';
var db = null;

require('mongodb').MongoClient.connect(url, function(err, connection) {
    assert.equal(null, err);
    console.log('DB connection established');
    db = connection;
});

exports.find = function(collection, callback) {
    var cursor = db.collection(collection).find();
    cursor.toArray(function(err, results) {
        assert.equal(null, err);
        callback(results);
    });
};
