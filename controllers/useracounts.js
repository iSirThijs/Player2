const express = require('express');
const router = express.Router();
const account = require('../utils/accountutils.js');
const querystring = require('querystring');

router
	.get('/', accountPage)
	.get('/login', loginForm)
	.post('/login', login)
	.get('/register', registerForm)
	.post('/register', register)
	.post('/signout', signOut);

function accountPage(req, res) {
	res.render('account/accountpage.ejs', { user: req.session.user });
}

function loginForm(req, res) {
	const query = querystring.stringify(req.query); // express parses the query, but I dont want it to
	res.locals.query = query;
	res.render('account/login.ejs');
}

function registerForm(req, res) {
	res.render('account/register.ejs');
	// built login check based on session
}

//
async function register(req, res) {
	let userInfo = req.body;

	try {
		let savedUser = await	account.add(userInfo);
		if (savedUser) {
			req.session.user = {username: userInfo.username};
			res.redirect('/');
		}
	} catch(err) {
		res.render('account/register.ejs', { userInfo: userInfo, error: true });
	}

}

async function login(req, res) {
	try {
		let username = req.body.username;
		let password = req.body.password;
		let login = await account.login(username, password);

		if (login) {
			req.session.user = {username: username};
			res.redirect(req.query.url || '/'); //the originalUrl must be parsed here
		}
	} catch(err) {
		res.redirect('/');
	}
}

function signOut(req, res) {
	req.session.destroy(() => res.redirect('/'));
}

module.exports = router;
