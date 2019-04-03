require('dotenv').config();
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const session = require('express-session');

// own modules
const gameLibrary = require('./controllers/gamelibrary.js');
const account = require('./controllers/accountpage.js');
const login = require('./utils/login.js');
const register = require('./utils/register.js');

server
	.use('/static', express.static('./public'))
	.use(bodyParser.urlencoded({ extended: true}))
	.use(session({
		resave: false, // checked session docs, false is best option(for now)
		saveUninitialized: true,
		secret: process.env.SESSION_SECRET
	}))
	.set('view engine', 'ejs')
	.set('views', './views' )
	.get('/', home)
	.get('/register', register.page)
	.post('/register', register.create)
	.get('/login', login.page)
	.post('/login', login.enter)
	.use('/account', login.require, account)
	.use('/games', login.require, gameLibrary)
	.use(notFound)
	.listen(process.env.PORT || 8000);

function notFound(req, res) {
	res.status(404).send('This page cannot be found');
}

function home(req, res) {
	res.render('home.ejs', { user: req.session.user });
}

// function errorHandler(err, req, res, next) {
//
// }
