const express = require('express');
const router = express.Router();

// Utils
const gamesUtil = require('../../utils/gamesUtil.js');
const accountUtil = require('../../utils/accountUtil.js');

router
	.get('/', (req, res) => res.render('profile/gamesPage.ejs', {data : []}) )
	.get('/search', (req, res) => res.render('profile/searchPage.ejs', {data : []}))
	.get('/search/query?', searchResult)
	.post('/add/:id', addGame);

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

async function addGame(req, res) {
	const username = req.session.user;
	const gameID = req.params.id;

	try {
		const checkExists = await gamesUtil.findGameById(gameID);
		const game = await gamesUtil.cardByID(gameID);

		if (!checkExists) {
			await gamesUtil.save(game);
		}

		await accountUtil.addGame(username, gameID);

		res.redirect('/profile/games');
	} catch(err) {
		console.log(err); //eslint-disable-line
		res.locals.notification = err;
		res.render('profile/gamesPage.ejs', {data: []});
	}

}

module.exports = router;
