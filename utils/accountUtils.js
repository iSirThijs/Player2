const mongoose = require('mongoose');
const argon2 = require('argon2');

// Define schema and model for mongoose
const userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	username: String,
	email: String,
	hash: String
});

const User = mongoose.model('User', userSchema, 'users');


exports.add = function(userInfo) {
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
				else resolve();
			});
		});
	});
};

exports.login = function(username, password) {
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
};
