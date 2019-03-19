const express = require('express');
const router = express.Router();
const igdbApi = require('../utils/igdbApiCall.js');
const gamecard = require('./gamecarddata.js');

router.get('/', searchZero);
router.get('/query?', renderResults);
router.use(notFound);

function searchZero(req, res) {
	res.render('search/searchresult.ejs', {data : [ ], query: [] });
}

function renderResults(req, res) {
	igdbApi.findGame(req.query.q)
		.then(function (apiResults) {
			gamecard.resultsList(apiResults)
				.then((resultData) => {
					res.render('search/searchresult.ejs', {data : resultData});
				});
		}
		);
}

function notFound(req, res) {
	res.send('cannot find ' + req.url);
}

module.exports = router;
