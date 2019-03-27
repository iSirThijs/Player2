const express = require('express');
const router = express.Router();
const account = require('../utils/accountUtils.js');

router
	.get('/', (req, res) => res.send('on the account page'))
	.get('/login', loginForm)
	.post('/login', login)
	.get('/register', registerForm)
	.post('/register', register);

function loginForm(req, res) {
	res.render('account/login.ejs');
	// built login check based on session
}

function registerForm(req, res) {
	res.render('account/register.ejs');
	// built login check based on session
}

//
async function register(req, res) {
	let userInfo = req.body;
	let savedUser = await	account.add(userInfo);

	if (savedUser) {
		req.session.user = {username: userInfo.username};
		res.redirect('/');
	} else {
		res.render('account/register.ejs', { userInfo: userInfo, Error: true });
	}
}

async function login(req, res) {
	let username = req.body.username;
	let password = req.body.password;
	let login = await account.login(username, password);

	if (login) {
		req.session.user = {username: username};
		res.redirect('/');
	} else {
		res.redirect('/');
	}
}

module.exports = router;
