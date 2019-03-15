const express = require('express');
const router = express.Router();
const db = require('../models/data.js');

// Data to use for the search will be replaced by the API call
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
	resultData = db;
	res.redirect(url + '/search');
}

function notFound(req, res) {
	res.send('cannot find ' + req.url);
}

module.exports = router;
