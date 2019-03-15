const express = require('express');
const router = express.Router();
const gameSearch = require('./search.js');

// This data is temporary until there is an api and database connection
var data = [
	{
		id: 'anno-1800',
		title: 'Anno 1800',
		img: 'https://gpstatic.com/acache/37/76/1/uk/packshot-5646fd847c86d0570aaf2d630505b6ec.jpg alt=cover-anno'
	}
];
var newData = [
	{
		id: 'ac-odyssey',
		title: 'Assassin\'s Creed Odyssey',
		img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/ACOdysseyCoverArt.png/220px-ACOdysseyCoverArt.png alt=cover-ac'
	}
];

router.get('/', libraryRender)
	.post('/delete/:id', deleteGame)
	.post('/:id', addGame)
	.use('/search', gameSearch);

function libraryRender(req, res){
	res.render('profile/game-library.ejs', {data: data});
}

function addGame (req, res) {
	let id = req.params.id;
	let game = newData.filter(function (value) {
		return value.id == id;
	});
	data.push(game[0]);
	newData = newData.filter(function (value) {
		return value.id !== id;
	});
	res.status(200).redirect('/games');
}

function deleteGame(req, res) {
	let id = req.params.id;
	let game = data.filter(function (value) {
		return value.id == id;
	});
	newData.push(game[0]);
	data = data.filter(function (value) {
		return value.id !== id;
	});
	res.status(200).redirect('/games');
}

module.exports = router;
