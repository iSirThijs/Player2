const express = require('express');
const router = express.Router();

// Data to use for the search will be replaced by the API call
var url
var resultData = [];
var searchData = [
	{
		id: 'ac-odyssey',
		title: 'Assassin\'s Creed Odyssey',
		img: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/99/ACOdysseyCoverArt.png/220px-ACOdysseyCoverArt.png alt=cover-ac'
	}
];

router.get('/', searchRender);
router.get('/query?', searchResults);
router.use(notFound)

function searchRender(req, res) {
	res.render('profile/search.ejs', {data: resultData});
	var baseUrl = req.baseUrl.split('/');
	baseUrl.pop();
	url = baseUrl.join('/')
	console.log(url);
}

function searchResults(req, res) {
	resultData.push(searchData[0]);
	console.log(url)
	res.redirect(url + '/search');
}

function notFound(req, res) {
		res.send('cannot find ' + req.url)
}

module.exports = router;
