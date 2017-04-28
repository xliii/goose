/**
 * Created by User on 2017-04-28.
 */
var DB = require('../db');

exports.findAll = function(callback) {
    DB.find('goose', function(results) {
        callback(results);
    })
};