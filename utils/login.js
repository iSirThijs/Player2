const queryString = require('querystring');
const mongoose = require('mongoose');
const argon2 = require('argon2');

// required models
const User = require('../models/user.js');

exports.page = function(req, res) {
	const query = queryString.stringify(req.query); // express parses the query, but I dont want it to
	res.locals.query = query;
	res.locals.user = null;
	res.render('login.ejs');
};

exports.enter = async function(req, res) {
	try {
		let username = req.body.username;
		let password = req.body.password;
		let match = await login(username, password);

		if (match) {
			req.session.user = {username: username};
			res.redirect(req.query.url || '/'); //the originalUrl must be parsed here
		}
	} catch(err) {
		res.redirect('/');
	}
};

exports.require = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		const query = queryString.stringify({
			url: req.originalUrl
		});
		res.status(403).redirect('/login?' + query);
	}
};

function login(username, password) {
	return new Promise(function(resolve, reject) {
		mongoose.connect(process.env.MONGODB, { dbName: 'gamerdate'});
		const db = mongoose.connection;

		db.on('error', (err) => reject(err));
		db.once('open', async function() {
			let data = await User.find({ username: username});
			let user = data && data[0];

			if (user) {
				let match = await argon2.verify(user.hash, password);
				resolve(match);
			} else {
				reject('This user does not exist');
			}
		});
	});
}
