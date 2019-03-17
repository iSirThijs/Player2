require('dotenv'); //eslint-disable-line
const express = require('express');
const router = express.Router();
const igdbApi = require('../utils/igdbApiCall.js');

var url;
var resultData = [];

router.get('/', searchRender);
router.get('/query?', searchResults);
router.use(notFound);

function searchRender(req, res) {
	res.render('profile/search.ejs', {data: resultData});
	let baseUrl = req.baseUrl.split('/');
	console.log(baseUrl); //eslint-disable-line
	baseUrl.pop();
	url = baseUrl.join('/');
	console.log(url); //eslint-disable-line
}

function searchResults(req, res) {
	resultData = [];
	igdbApi.findGame(req.query.q).then(function (queryResults) {
		for (let i = 0; i < queryResults.length; i++) {
			igdbApi.imageLink(queryResults[i].cover, 'cover_small').then(function(imgLink) {
				resultData.push(
					{
						id: queryResults[i].id,
						title: queryResults[i].name,
						img: imgLink
					}
				);
			})
				.catch(function (imgLink) {
					if (!imgLink) {
						resultData.push(
							{
								id: queryResults[i].id,
								title: queryResults[i].name,
								img: '/static/icons/notfound.png'
							}
						);
					}
				});
		}
	}).then(() => {
		res.redirect( url + '/search');
	});
}

function notFound(req, res) {
	res.send('cannot find ' + req.url);
}

module.exports = router;
