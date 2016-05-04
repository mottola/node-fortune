;
(function() {
    'use strict';

    var fs = require('fs');

    //requires express
    var express = require('express');
    var handlebars = require('express-handlebars');
    var fortunes = require('./fortunes.js');
    var bodyParser = require('body-parser');

    //sets express to app
    var app = express();

    // changing express engine to handlebars
    app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
    app.set('view engine', 'handlebars');

    //serves everything in the public directory (as is!)
    app.use(express.static('public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //when we receive a get request to /cats, respond accordingly
    app.get('/', function(req, res) {
        fortunes.getFortune(function(fortune) {
            res.render('index', {
                name: "Rick",
                fortune: fortune
            });
        });
    });

    app.post('/new', function(req, res) {
    	var newFortune = req.body.newFortune;
    	fortunes.addFortune(newFortune);
    	res.redirect('/');

    });



    //starts the server
    app.listen(3000, function() {
        console.log("WE'LL DO IT LIVE!!!");
    });

}());
