/**
 * Created with IntelliJ IDEA.
 * User: User
 * Date: 4/25/17
 * Time: 10:19 PM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var assert = require('assert');
var shuffle = require('./script/shuffle.js');

app.set('view engine', 'ejs');

var url = 'mongodb://localhost:27017/goose';

app.use(require('express-mongo-db')(url));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : false}));

app.get('/', function(req, res) {
    res.render('index');
});

var random = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

var players = ['XLIII', 'VitBuk', 'Panda', 'HRUST', 'Cheeko', 'Dashutka'];

app.get('/generate', function(req, res) {
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
    console.log(JSON.stringify(goose));
    res.render('goose', {
        goose : goose
    });
});

app.get('/list', function(req, res) {
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

app.get('/add', function(req, res) {
    res.render('add');
});

app.post('/addGoose', function(req, res) {
    var goose = JSON.parse(req.body.goose);
    console.log(goose);
    res.send({message : 'Goose successfully added!'});
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening to 3000');
});