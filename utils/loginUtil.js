const queryString = require('querystring');
const mongoose = require('mongoose');
const argon2 = require('argon2');

// required models
const User = require('../models/user.js');

exports.page = function(req, res) {
	if(!req.session.user) {
		const query = queryString.stringify(req.query); // express parses the query, but I dont want it to
		res.locals.query = query;
		res.render('login.ejs');
	} else res.redirect('/profile');
};

exports.enter = async function(req, res, next) {
	try {
		let username = req.body.username;
		let password = req.body.password;
		let match = await login(username, password);

		if (match) {
			req.session.user = { username: username};
			res.redirect(req.query.url || '/'); //the originalUrl must be passed here
		} else {
			const query = queryString.stringify(req.query); // express parses the query, but I dont want it to
			res.locals.query = query;
			res.locals.notification = {
				type: 'warning',
				content: 'Password isn\'t correct'
			};
			res.render('login.ejs');
		}
	} catch(err) {
		next(err);
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

exports.nonRequire = function(req, res, next) {
	if (!req.session.user) {
		next();
	} else {
		res.redirect('/profile');
	}
};

function login(username, password) {
	return new Promise(function(resolve, reject) {
		mongoose.connect(process.env.MONGODB,
			{
				dbName: 'gamerdate',
				useNewUrlParser: true
			});
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
