const igdbApi = require('../utils/igdbApiCall.js');

exports.resultsList = function(apiResults) {
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
};
