const queryString = require('querystring');
const mongoose = require('mongoose');
const argon2 = require('argon2');

// required models
const User = require('../models/user.js');

exports.page = function(req, res, ) {
	const query = queryString.stringify(req.query); // express parses the query, but I dont want it to
	const renderData =
	{
		query: query,
		user: false,
		message: false
	};

	res.render('login.ejs', renderData);
};

exports.enter = async function(req, res) {
	let {username, password} = req.body;
	const query = queryString.stringify(req.query);
	const renderData =
	{
		query: query,
		user: false,
	};

	if ( !username || username.length === 0 ) {
		renderData.message =
		{
			title: 'Oops there is something wrong',
			type: 'warning',
			content: 'You need to enter a username'
		};
		res.render('login.ejs', renderData);
	} else if (!password || password.length === 0 ) {
		renderData.message =
		{
			title: 'Oops there is something wrong',
			type: 'warning',
			content: 'Please enter your password'
		};
		res.render('login.ejs', renderData);
	} else {
		try {
			await login(username, password);
			req.session.user = {username: username};
			res.redirect(req.query.url || '/'); //the originalUrl must be parsed here
		} catch(err) {
			renderData.message =
			{
				title: 'Oops there is something wrong',
				type: 'error',
				content: err.message
			};
			res.render('login.ejs', renderData);
		}
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

		db.on('error', () => reject(new Error('There was a problem on the server')));
		db.once('open', async function() {
			let data = await User.find({ username: username});
			let user = data && data[0];

			if(user) {
				try {
					let match = await argon2.verify(user.hash, password);
					if (match) resolve(match);
					else reject(new Error('Wrong Password'));
				} catch(err) {
					reject(new Error('There was a problem on the server'));
				}
			} else reject(new Error('This user does\'t exist'));
		});
	});
}
