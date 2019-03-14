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

exports.libraryRender = function(req, res){
	res.render('profile/game-library.ejs', {data: data});
};

exports.searchRender = function(req, res) {
	res.render('profile/game-search.ejs', {data: newData});
}

exports.addGame = function(req, res) {
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

exports.deleteGame = function(req, res) {
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
