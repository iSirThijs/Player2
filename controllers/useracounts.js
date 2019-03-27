const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	username: String,
	email: String,
	password: String
});

var User = mongoose.model('User', userSchema);

router
	.get('/', (req, res) => res.send('on the account page'))
	.get('/login', loginForm)
	.post('/login', login)
	.get('/register', register)
	.post('/register', addAccount);
// .get('/settings', settings)

function loginForm(req, res) {
	res.render('account/login.ejs');
	// built login check based on session
}

function register(req, res) {
	res.render('account/register.ejs');
}

function addAccount(req, res) {
	console.log(req.body) //eslint-disable-line
	res.redirect('/account/login');
	mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
	db.once('open', function() {

		var newUser = new User({
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			username: req.body.username,
			email: req.body.email,
			password: req.body.password
		});

		newUser.save(function (err) {
			if (err) return console.error(err); //eslint-disable-line
		});

	});

}

function login(req, res) {
	let username = req.body.username;
	let password = req.body.password;//eslint-disable-line

	mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
	var db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line
	db.once('open', function() {
		User.find({ username: username }, function (err, users) {
			let user = users[0];

			if (err) return console.error(err);//eslint-disable-line
			else if (user.password == password) {
				req.session.user = { username: user.username};
				res.redirect('/');
			} else res.send('not good');
		});
	});

}
//
// function settings(req, res) {
// 	res.render('account/settings.ejs')
// }

module.exports = router;
