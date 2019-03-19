require('dotenv').config();
const express = require('express');
const server = express();
const gameLibrary = require('./controllers/gamelibrary.js');
const userAccounts = require('./controllers/useracounts.js');

server
	.use('/static', express.static('./public'))
	.set('view engine', 'ejs')
	.set('views', './views' )
	.use('/account', userAccounts)
	.get('/login', (req, res) => res.redirect('/account/login'))
	.use('/games', gameLibrary)
	.use(notFound)
	.listen(8000);

function notFound(req, res) {
	res.status(404).send('This page cannot be found');
}
