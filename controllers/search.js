const express = require('express');
const router = express.Router();
// const igdbApi = require('../utils/igdb-api.js');
const gameCards = require('../utils/gamecards.js');

router.get('/', searchZero);
router.get('/query?', renderResults);

function searchZero(req, res) {
	const renderData =
	{
		data : [ ],
		user: req.session.user,
		message: false
	};
	res.render('search/searchresult.ejs', renderData );
}

async function renderResults(req, res) {
	try {
		const results = await gameCards.create(req.query.q);
		const renderData =
		{
			data: results,
			user: req.session.user,
			message: false
		};
		res.render('search/searchresult.ejs', renderData);

	} catch(err) {
		const renderData =
		{
			data: [],
			user: req.session.user,
			message: {
				title: 'Oops, something went wrong',
				type: 'error',
				content: err.message
			}
		};

		res.render('search/searchresult.ejs', renderData);
	}
}

module.exports = router;
