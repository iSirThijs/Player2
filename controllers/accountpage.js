const express = require('express');
const router = express.Router();

router
	.get('/', accountPage)
	.get('/signout', signOut);

function accountPage(req, res) {
	res.render('account/accountpage.ejs', { user: req.session.user });
}

function signOut(req, res) {
	req.session.destroy(() => res.redirect('/'));
}

module.exports = router;
