require('dotenv').config();
const express = require('express');
const server = express();
const gameLibrary = require('./controllers/gamelibrary.js');
const userAccounts = require('./controllers/useracounts.js');
const bodyParser = require('body-parser');
const session = require('express-session');

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
	.use('/account', userAccounts)
	.get('/login', (req, res) => res.redirect('/account/login'))
	.use('/games', gameLibrary)
	.use(notFound)
	.listen(8000);

function notFound(req, res) {
	res.status(404).send('This page cannot be found');
}

function home(req, res) {
	if (req.session.user) {
		res.send('Hellloo' + req.session.user.username);
	}
	else {
		res.send('helllooo nobody');
	}

}
