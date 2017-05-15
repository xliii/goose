/**
 * Created by User on 2017-04-28.
 */
var router = require('express').Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.use('/goose', require('./goose'));
router.use('/game', require('./game'));

router.get('/generate', function(req, res) {
    var goose = require('../misc/generator')();
    res.render('goose', {
        saved : false,
        goose : goose
    });
});

router.get('/grid', function(req, res) {
    res.redirect('/goose/grid');
});

router.get('/404', function(req, res) {
    res.render('404');
});

module.exports = router;