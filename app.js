/**
 * Created with IntelliJ IDEA.
 * User: User
 * Date: 4/25/17
 * Time: 10:19 PM
 * To change this template use File | Settings | File Templates.
 */

var express = require('express');
var path = require('path');
var app = express();

app.set('view engine', 'ejs');

var gooseArchive = ['Goose A', 'Goose B'];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/list', function(req, res) {
    res.render('list', {'list' : gooseArchive});
});

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening to 3000');
});