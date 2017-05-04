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
                author: goose.author,
                id : goose._id
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
                id : goose._id,
                title: goose.title,
                author : goose.author,
                players : goose.players
            }
        });
        geese.forEach(function(goose) {
            goose.players.forEach(function(player) {
                allPlayers.push(player);
            });
            allPlayers.push(goose.author);
        });
        //Leave only distinct players
        allPlayers = allPlayers.filter(function(value, index, self) {
            return self.indexOf(value) === index;
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

router.delete('/:id', function(req, res) {
    Goose.remove(req.params.id, function() {
        console.log('Goose removed!');
        res.send({message : 'Goose successfully removed!'});
    })
});

router.get('/read/:id', function(req, res) {
    Goose.findOne(req.params.id, function(goose) {
        if (goose) {
            res.render('goose', {
                saved : true,
                goose : goose
            });
        } else {
            res.redirect('/404');
        }
    });
});

router.post('/:id/players/add/:player', function(req, res) {
    Goose.addPlayer(req.params.id, req.params.player, function() {
        res.send({played : true});
    });
});

router.post('/:id/players/remove/:player', function(req, res) {
    Goose.removePlayer(req.params.id, req.params.player, function() {
        res.send({played : false});
    });
});

module.exports = router;