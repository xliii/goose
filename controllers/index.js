/**
 * Created by User on 2017-04-28.
 */
var router = require('express').Router();
var shuffle = require('./../script/shuffle.js');

var players = ['XLIII', 'VitBuk', 'Panda', 'HRUST', 'Cheeko', 'Dashutka'];

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/add', function(req, res) {
    res.render('add');
});

router.post('/addGoose', function(req, res) {
    var goose = JSON.parse(req.body.goose);
    console.log(goose);
    res.send({message : 'Goose successfully added!'});
});

router.get('/list', function(req, res) {
    var cursor = req.db.collection('goose').find();
    cursor.toArray(function(err, results) {
        var geese = results.map(function(goose) {
            return {
                name: goose.name,
                author: goose.author
            }
        });
        res.render('list', {'list' : geese});
    });
});

router.get('/generate', function(req, res) {
    shuffle(players);
    var rounds = [];
    var roundNum = 2 + Math.floor(Math.random() * 4);
    while (roundNum > 0) {
        rounds.push({
            title: 'Round' + Math.floor(Math.random() * 1000),
            subtitle: 'Subtitle',
            options: [
                {
                    name: 'Correct',
                    comment: 'Yup',
                    correct: true
                },
                {
                    name: 'Incorrect',
                    comment: 'Nope',
                    correct: false
                }
            ]
        });
        roundNum--;
    }
    var goose = {
        title: 'Goose',
        author: players[0],
        games: [
            { players: [players[1], players[2], players[3]]}
        ],
        players: {
            min: 3,
            max: 5,
            optimal: 4
        },
        rounds: rounds
    };
    //console.log(JSON.stringify(goose));
    res.render('goose', {
        goose : goose
    });
});


module.exports = router;