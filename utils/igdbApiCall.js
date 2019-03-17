const request = require('apicalypse').default;
const requestOptions =
	{
		queryMethod: 'body',
		method: 'get',
		baseURL: 'https://api-v3.igdb.com',
		headers: {
			'Accept' : 'application/json',
			'user-key' : process.env.IGDB_API_KEY
		},
		responseType: 'json'
	};


exports.imageLink = function(id, size) {
	return new Promise(
		function (resolve) {
			request(requestOptions)
				.fields('image_id')
				.limit(1)
				.where('id = ' + id)
				.request('/covers')
				.then(function (response) {
					let img = 'https://images.igdb.com/igdb/image/upload/t_' + size + '/' + response.data[0].image_id + '.png';
					resolve(img);
				})
				.catch(function () {
					let img = '/static/icons/notfound.png';
					resolve(img);
				});
		}
	);
};

exports.findGame = function(query) {
	return new Promise(
		function (resolve, reject) {
			request(requestOptions)
				.fields('name, cover')
				.limit(10)
				.search(query)
				.request('/games')
				.then(function (response) {
					resolve(response.data);
				}
				)
				.catch((response) => {
					reject(response);
				});
		});
};
