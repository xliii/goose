/**
 * Created by User on 2017-04-28.
 */
var assert = require("assert");
var ObjectId = require('mongodb').ObjectId;
var db = null;

require('mongodb').MongoClient.connect(process.env.MONGODB_URI, function(err, connection) {
    assert.equal(err, null);
    console.log('DB connection established');
    db = connection;
});

exports.find = function(collection, callback) {
    var cursor = db.collection(collection).find();
    cursor.toArray(function(err, results) {
        assert.equal(err, null);
        callback(results);
    });
};

exports.findOne = function(collection, id, callback) {
    db.collection(collection).findOne({_id : new ObjectId(id)}, function(err, document) {
        assert.equal(err, null);
        callback(document);
    });
};

exports.count = function(collection, callback) {
    db.collection(collection).count(function(err, count) {
        assert.equal(err, null);
        console.log(count);
        callback(count);
    });
};

exports.add = function(collection, item, callback) {
    db.collection(collection).insertOne(item, function(err, result) {
        assert.equal(err, null);
        callback();
    });
};