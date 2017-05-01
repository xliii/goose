/**
 * Created by User on 2017-04-28.
 */
var router = require('express').Router();
var Goose = require('../model/goose');

router.get('/', function(req, res) {
    res.redirect('/goose/list');
});

router.get('/list', function(req, res) {
    Goose.findAll(function(results) {
        var geese = results.map(function(goose) {
            return {
                title: goose.title,
                author: goose.author
            }
        });
        res.render('list', {'list' : geese});
    });
});

router.get('/grid', function(req, res) {
    Goose.findAll(function(results) {
        var allPlayers = [];
        var geese = results.map(function(goose) {
            return {
                title: goose.title,
                author : goose.author,
                players : !goose.games ? [] : goose.games.reduce(function(acc, game) {
                    game.players.forEach(function(player) {
                        if (acc.indexOf(player) < 0) {
                            acc.push(player);
                        }
                        if (allPlayers.indexOf(player) < 0) {
                            allPlayers.push(player);
                        }
                    });
                    acc.sort();
                    return acc;
                }, [])
            }
        });
        allPlayers.sort();
        res.render('grid', {games : geese, players : allPlayers});
    });
});

router.get('/new', function(req, res) {
    res.render('new');
});

router.post('/add', function(req, res) {
    var goose = JSON.parse(req.body.goose);
    Goose.add(goose, function() {
        console.log('Goose added!');
        res.send({message : 'Goose successfully added!'});
    });
});

module.exports = router;