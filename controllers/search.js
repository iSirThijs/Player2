require('dotenv'); //eslint-disable-line
const express = require('express');
const router = express.Router();
// const db = require('../models/data.js');
const igdb = require('igdb-api-node').default;
const igdbClient = igdb('50e14a7ffa9e56521322e64428db7586');

var url;
var resultData = [];

router.get('/', searchRender);
router.get('/query?', searchResults);
router.use(notFound);

function searchRender(req, res) {
	res.render('profile/search.ejs', {data: resultData});
	var baseUrl = req.baseUrl.split('/');
	baseUrl.pop();
	url = baseUrl.join('/');
}

function searchResults(req, res) {
	igdbClient.games({
		limit: 1,
		offset: 0,
		search: req.query.q
	}, [
		'name',
		'id',
	]).then(function (response) {
		let results = response.body;
		console.log(results); //eslint-disable-line
		resultData.push(results);
		res.redirect(url + '/search');
	}).catch(function (reason) {
		console.log('There was an error: ' + reason); //eslint-disable-line
		res.redirect(url + '/search');
	});
}

function notFound(req, res) {
	res.send('cannot find ' + req.url);
}

module.exports = router;
