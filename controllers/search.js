const express = require('express');
const router = express.Router();
const igdbApi = require('../utils/igdbApiCall.js');

router.get('/', searchZero);
router.get('/query?', searchResults);
router.use(notFound);

function searchZero(req, res) {
	res.render('search/searchresult.ejs', {data : [ ]});
}

function searchResults(req, res) {
	igdbApi.findGame(req.query.q)
		.then(function (apiResults) {
			resultsList(apiResults)
				.then((resultData) => {
					res.render('search/searchresult.ejs', {data : resultData});
				})
				.catch((error) => res.send('there was a problem with rendering' + error));
		}
		)
		.catch((error) => res.send('there was a problem with the query ' + error));
}

function notFound(req, res) {
	res.send('cannot find ' + req.url);
}

function resultsList(apiResults) {
	return new Promise(function(resolve) {
		let promises = [];

		for (let i = 0; i < apiResults.length; i++) {
			promises.push(
				new Promise(function(resolve) {
					igdbApi.imageLink(apiResults[i].cover, 'cover_small')
						.then((imgLink) => resolve(imgLink));
				})
			);
		}

		Promise.all(promises).then(function (imgLink) {
			let resultsArray = [];
			for (let i = 0; i < apiResults.length; i++) {
				resultsArray.push(
					{
						id: apiResults[i].id,
						title: apiResults[i].name,
						img: imgLink[i]
					}
				);
			}
			resolve(resultsArray);
		});
	});
}

module.exports = router;
