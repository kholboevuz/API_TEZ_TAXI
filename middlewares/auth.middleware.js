const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	if (token == null) {
		return res.sendStatus(401)
	}
	const secretKey = `${process.env.JWT_SECRET_KEY_USERNAME}:${process.env.JWT_SECRET_KEY_PASSWORD}`
	jwt.verify(token, secretKey, (err, data) => {
		if (err) {
			return res.sendStatus(403)
		}
		req.data = data
		next()
	})

}


module.exports = authenticateToken