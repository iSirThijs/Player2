const mongoose = require('mongoose');
const argon2 = require('argon2');

// required models
const User = require('../models/user.js');

exports.page = function(req, res) {
	res.locals.user = null;
	res.render('register.ejs');
};

exports.create = async function(req, res) {
	let userInfo = req.body;

	try {
		let savedUser = await	addAccount(userInfo);
		if (savedUser) {
			req.session.user = {username: userInfo.username};
			res.redirect('/');
		}
	} catch(err) {
		res.render('account/register.ejs', { userInfo: userInfo, error: true });
	}
};

function addAccount(userInfo) {
	return new Promise(function(resolve, reject) {
		mongoose.connect(process.env.MONGODB, { dbName: 'gamerdate'});
		const db = mongoose.connection;

		db.on('error', (err) => reject(err));
		db.once('open', async function () {
			let newUser = new User({
				firstname: userInfo.firstname,
				lastname: userInfo.lastname,
				username: userInfo.username,
				email: userInfo.email,
				hash: await argon2.hash(userInfo.password)
			});

			newUser.save( function(err) {
				if (err) reject(err);
				else resolve(true);
			});
		});
	});
}
