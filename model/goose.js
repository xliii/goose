/**
 * Created by User on 2017-04-28.
 */
var DB = require('../db');

exports.findAll = function(callback) {
    DB.find('goose', callback);
};

exports.add = function(goose, callback) {
    DB.add('goose', goose, callback);
};

exports.findOne = function(id, callback) {
    DB.findOne('goose', id, callback);
};

exports.remove = function(id, callback) {
    DB.deleteOne('goose', id, callback);
};

exports.addPlayer = function(id, player, callback) {

};

exports.removePlayer = function(id, player, callback) {

};