/**
 * Created by User on 2017-05-15.
 */
var DB = require('../db');

exports.new = function(goose) {
    return {
        id: goose._id
    }
};