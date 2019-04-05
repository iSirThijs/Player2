const igdbApi = require('./igdbApiUtil.js');

exports.cards = async function(query) {
	if ( !query || query.length === 0 ) {
		let err = { type: 'warning', content:'Please provide a search query' };
		throw err;
	} else {
		try {
			const promises = [];
			const games = await igdbApi.findGames(query);

			for (var i = 0; i < games.length; i++) {
				promises.push(
					new Promise(async function(resolve){
						const gameCard = {
							id: games[i].id,
							title: games[i].name,
							img: await igdbApi.coverLink(games[i].cover, 'cover_small')
						};
						resolve(gameCard);
					})
				);
			}
			const gameCards = await Promise.all(promises);
			return gameCards;
		} catch(err) {
			throw err;
		}
	}
};
