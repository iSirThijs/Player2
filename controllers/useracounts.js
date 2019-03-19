const express = require('express');
const router = express.Router();

router
	.get('/', (req, res) => res.send('on the account page'))
	.get('/login', login);
// .get('/register', register)
// .get('/settings', settings)

function login(req, res) {
	res.render('account/login.ejs');
	// built login check based on session
}

// function register(req, res) {
// 	res.render('account/register.ejs')
// }
//
// function settings(req, res) {
// 	res.render('account/settings.ejs')
// }

module.exports = router;
