const express = require('express');
const router = express.Router();

// Utils
const gamesUtil = require('../../utils/gamesUtil.js');

router
	.get('/', (req, res) => res.render('profile/gamesPage.ejs', {data : []}) )
	.get('/search', (req, res) => res.render('profile/searchPage.ejs', {data : []}))
	.get('/search/query?', searchResult);

async function searchResult(req, res) {
	try {
		const results = await gamesUtil.cards(req.query.q);
		res.locals.data = results;
		res.render('profile/searchPage.ejs');
	} catch(err) {
		res.locals.notification = err;
		res.locals.data = [];
		res.render('profile/searchPage.ejs');
	}
}

module.exports = router;
