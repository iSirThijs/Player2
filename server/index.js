const express = require('express')
const server = express()

var data = [
	{
		title: 'Assassin\'s Creed Odyssey',
		img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/ACOdysseyCoverArt.png/220px-ACOdysseyCoverArt.png alt=cover-ac'
	},
	{
		title: 'Anno 1800',
		img: 'https://gpstatic.com/acache/37/76/1/uk/packshot-5646fd847c86d0570aaf2d630505b6ec.jpg alt=cover-anno'
	}
]

server
	.use(express.static('./source/static'))
	.set('view engine', 'ejs')
	.set('views', './source/views' )
	.get('/', hello)
	.get('/profile/games', myGamesRender)
	.use(notFound)
	.listen(8000)

function hello(req, res) {
	res.send('hello world');
}

function notFound(req, res) {
	res.status(404).send('This page cannot be found')
}

function myGamesRender(req, res){
	res.render('mygames.ejs', {data: data})
}
