/**
 * Created by User on 2017-04-28.
 */
var players = ['XLIII', 'VitBuk', 'Panda', 'HRUST', 'Cheeko', 'Dashutka'];

var shuffle = require('../script/shuffle');

module.exports = function() {
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
    return {
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
};