const mongoose = require('mongoose');
const argon2 = require('argon2');

// required models
const User = require('../models/user.js');

exports.create = function (userInfo) {
	return new Promise(function(resolve, reject) {
		mongoose.connect(process.env.MONGODB,
			{
				dbName: 'gamerdate',
				useNewUrlParser: true
			});

		const db = mongoose.connection;

		db.on('error', (err) => reject(err));
		db.once('open', async function () {
			let newUser = new User({
				firstname: userInfo.firstname,
				lastname: userInfo.lastname,
				username: userInfo.username,
				email: userInfo.email,
				hash: await argon2.hash(userInfo.password),
			});

			newUser.save( function(err) {
				if (err) reject({type: 'error'});
				else resolve();
			});
		});
	});
};

exports.checkExistence = function(check, info) {
	return new Promise(function(resolve, reject) {
		mongoose.connect(process.env.MONGODB,
			{
				dbName: 'gamerdate',
				useNewUrlParser: true
			});
		const db = mongoose.connection;

		db.on('error', () => reject({type: 'error'}));
		db.once('open', async function () {
			let data = await User.find({ [check]: info });
			let user = data && data[0];

			if (!user) resolve();
			else reject({type: 'warning', content: `A user with this ${check} already exists`});
		});
	});
};

exports.checkPassReqs = function(password) {
	return new Promise(function(resolve, reject) {
		let min = 6;
		let max = 20;

		if (password.length > min && password.length < max) resolve();
		else reject({type: 'warning', content: 'Password doensn\'t meet requirements'});
	});
};

exports.addGame = async function(username, gameID) {
	return new Promise(function(resolve, reject) {
		mongoose.connect(process.env.MONGODB,
			{
				dbName: 'gamerdate',
				useNewUrlParser: true
			});
		const db = mongoose.connection;

		db.on('error', () => reject({type: 'error'}));
		db.once('open', async function () {
			try {
				const user = await User.findOne(username);

				user.games.push(gameID);
				await user.save();
				resolve();
			} catch(err) {
				reject({type: 'error', content: 'in Addgame'});
			}
		});
	});
};
