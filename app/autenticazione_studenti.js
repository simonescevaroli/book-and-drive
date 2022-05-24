const express = require('express');
const router = express.Router();
const Studente = require('./models/studente.js');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


router.post('', async function(req, res) {
	
	// find the user
	let studente = await Studente.findOne({
		_id: req.body.username_studente
	}).exec();
	
	// user not found
	if (!studente) {
		res.status(401).json({success: false, message: 'Authentication failed. User not found.' });
	}
	
	// check if password matches
	if (studente.password != req.body.password) {
		res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
	}
	
	// if user is found and password is right create a token
	var payload = {
		username_studente: studente._id,
        role: "student"
		// other data encrypted in the token	
	}
	var options = {
		expiresIn: 86400 // expires in 24 hours
	}
	var token = jwt.sign(payload, "a1", options);

	res.json({
		success: true,
		message: 'Enjoy your token!',
		token: token,
		username_studente: studente._id,
		role: "studente"
	});

});



module.exports = router;