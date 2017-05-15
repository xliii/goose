/**
 * Created by User on 2017-05-15.
 */
var DB = require('../db');

exports.new = function(goose, callback) {
    var game = {
        goose : goose
    };
    DB.add('game', game, function() {
        callback(game);
    });
};

exports.findOne = function(id, callback) {
    DB.findOne('game', id, callback);
};