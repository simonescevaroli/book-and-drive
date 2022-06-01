const express = require('express');
const router = express.Router();
const Studente = require('./models/studente.js');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


router.post('', async function(req, res) {
	
	// find the user
	let studente = await Studente.findOne({
		_id: req.body.username_studente
	});
	
	// user not found
	if (!studente) {
		res.status(401).json({success: false, message: 'Authentication failed. User not found.' });
        return;
	}
	
	// check if password matches
	if (studente.password != req.body.password) {
		res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        return;
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
	var token = jwt.sign(payload, process.env.SUPER_SECRET, options); //cambiare la stringa segreta per l encoding

	res.status(200).json({
		success: true,
		message: 'Enjoy your token!',
		token: token,
		username_studente: studente._id,
		role: "studente"
	});

});



module.exports = router;