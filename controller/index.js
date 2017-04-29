/**
 * Created by User on 2017-04-28.
 */
var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.use('/goose', require('./goose'));

router.get('/generate', function(req, res) {
    var goose = require('../misc/generator')();
    //console.log(JSON.stringify(goose));
    res.render('goose', {
        goose : goose
    });
});

router.get('/grid', function(req, res) {
    res.redirect('/goose/grid');
});

module.exports = router;