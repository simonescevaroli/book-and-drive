const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens

const tokenChecker = function(req, res, next) {
	
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	// if there is no token
	if (!token) {
		res.status(403).send({ 
			success: false,
			error: 'No token provided.'
		});
		return
	}

	// decode token, verifies secret and checks exp
	jwt.verify(token, process.env.SUPER_SECRET, function(err, decoded) {	//cambiare "a1" con la stringa segreta per l encoding		
		if (err) {
			res.status(403).send({
				success: false,
				error: 'Failed to authenticate token.'
			});	
			return	
		} else {
			// if everything is good, save to request for use in other routes
			req.loggedUser = decoded;
			next();
		}
	});
	
};

module.exports = tokenChecker