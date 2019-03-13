const express = require('express');
const server = express();

// This data is temporary until there is an api and database connection
var data = [];
var newData = [
	{
		id: 'ac-odyssey',
		title: 'Assassin\'s Creed Odyssey',
		img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/ACOdysseyCoverArt.png/220px-ACOdysseyCoverArt.png alt=cover-ac'
	},
	{
		id: 'anno-1800',
		title: 'Anno 1800',
		img: 'https://gpstatic.com/acache/37/76/1/uk/packshot-5646fd847c86d0570aaf2d630505b6ec.jpg alt=cover-anno'
	}
];

server
	.use(express.static('./source/static'))
	.set('view engine', 'ejs')
	.set('views', './source/views' )
	.get('/profile/games', myGamesRender)
	.get('/profile/gamesearch', gameSearch)
	.post('/profile/gamesearch/:id', addGame)
	.post('/profile/delete/:id', deleteGame)
	.use(notFound)
	.listen(8000);

function notFound(req, res) {
	res.status(404).send('This page cannot be found');
}

function myGamesRender(req, res){
	res.render('profile/game-library.ejs', {data: data});
}

function gameSearch(req, res) {
	res.render('profile/game-search.ejs', {data: newData});
}

function addGame(req, res) {
	let id = req.params.id;
	let game = newData.filter(function (value) {
		return value.id == id;
	});
	data.push(game[0]);
	newData = newData.filter(function (value) {
		return value.id !== id;
	});
	res.status(200).redirect('/profile/games');
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
	res.status(200).redirect('/profile/games');
}
