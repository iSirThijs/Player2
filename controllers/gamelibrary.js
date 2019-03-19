const express = require('express');
const router = express.Router();
const gameSearch = require('./search.js');
const db = require('../models/data.js');

// This data is temporary until there is an api and database connection
var data = [];

router
	.get('/', libraryRender)
	.post('/delete/:id', deleteGame)
	.post('/:id', addGame)
	.use('/search', gameSearch);

function libraryRender(req, res){
	res.render('profile/game-library.ejs', {data: data});
}

function addGame (req, res) {
	let id = req.params.id;
	let game = db.filter(function (value) {
		return value.id == id;
	});
	data.push(game[0]);
	res.status(200).redirect('/games');
}

function deleteGame(req, res) {
	let id = req.params.id;
	let game = data.filter(function (value) {
		return value.id != id;
	});
	data = game;
	res.status(200).redirect('/games');
}

module.exports = router;
