const express = require('express');
const router = express.Router();

// sub controllers
const gamesLibrary = require('./gamesLibrary');

router
	.get('/', profilePage)
	.use('/games', gamesLibrary);

function profilePage(req, res) {
	res.render('profile/profilePage.ejs');
}





module.exports = router;
