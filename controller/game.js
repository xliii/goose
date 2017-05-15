/**
 * Created by User on 2017-05-15.
 */
var router = require('express').Router();
var Game = require('../model/game');

router.get('/:id', function(req, res) {
    var game = Game.findOne(req.params.id, function(game) {
        res.render('host', {
            goose : game.goose
        });
    });
});

module.exports = router;