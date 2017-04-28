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

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended : false}));

app.use(require('./controller'));

app.listen(process.env.PORT || 3000, function() {
    console.log('Listening to 3000');
});