const express = require('express');
const router = express.Router();
const Istruttore = require('./models/istruttore.js');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


router.post('', async function(req, res) {
	
	// find the user
	let istruttore = await Istruttore.findOne({
		_id: req.body.username_istruttore
	}).exec();
	
	// user not found
	if (!istruttore) {
		res.status(401).json({success: false, message: 'Authentication failed. User not found.' });
        return;
	}
	
	// check if password matches
	if (istruttore.password != req.body.password) {
		res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        return;
	}
	
	// if user is found and password is right create a token
	var payload = {
		username_istruttore: istruttore._id,
        role: "istruttore"
		// other data encrypted in the token	
	}
	var options = {
		expiresIn: 86400 // expires in 24 hours
	}
	var token = jwt.sign(payload, 'a1', options);//a1 da cambiare con stringa segreta per l encoding del token

	res.status(200).json({
		success: true,
		message: 'Enjoy your token!',
		token: token,
		username_istruttore: istruttore._id,
		role: "istruttore"
	});

});



module.exports = router;