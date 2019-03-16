require('dotenv').config();
const express = require('express');
const server = express();
const gameLibrary = require('./controllers/gamelibrary.js');

server
	.use('/static', express.static('./public'))
	.set('view engine', 'ejs')
	.set('views', './views' )
	.use('/games', gameLibrary)
	.use(notFound)
	.listen(8000);

function notFound(req, res) {
	res.status(404).send('This page cannot be found');
}
