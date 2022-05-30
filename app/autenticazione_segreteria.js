const express = require('express');
const router = express.Router();
const Segreteria = require('./models/segreteria.js');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


router.post('', async function(req, res) {
	
	// find the user
	let segreteria = await Segreteria.findOne({
		username: req.body.username_segreteria
	}).exec();
	
	// user not found
	if (!segreteria) {
		res.status(401).json({success: false, message: 'Authentication failed. User not found.' });
        return;
	}
	
	// check if password matches
	if (segreteria.password != req.body.password) {
		res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        return;
	}
	
	// if user is found and password is right create a token
	var payload = {
		username: segreteria.username,
        role: "segreteria"
		// other data encrypted in the token	
	}
	var options = {
		expiresIn: 86400 // expires in 24 hours
	}
	var token = jwt.sign(payload,process.env.SUPER_SECRET, options); //cambiare la stringa segreta per l encoding

	res.json({
		success: true,
		message: 'Enjoy your token!',
		token: token,
		role: "segreteria"
	});

});



module.exports = router;