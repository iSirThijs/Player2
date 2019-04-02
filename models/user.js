const mongoose = require('mongoose');

// Define schema and model for mongoose
const userSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	username: String,
	email: String,
	hash: String
});

const User = mongoose.model('User', userSchema, 'users');

module.exports = User;
