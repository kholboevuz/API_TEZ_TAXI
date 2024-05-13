const apiVersionMiddleware = (req, res, next) => {

	const apiVersion = req.body.apiversion

	const currentVersion = process.env.CURRENT_VERSION

	if (apiVersion == currentVersion) {
		next()
	} else {
		res.status(403).json({
			success: false,
			code: 403,
			message: "API outdated version, current version: 1.0"
		})
	}

}


module.exports = apiVersionMiddleware