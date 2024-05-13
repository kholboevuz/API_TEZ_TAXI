const errorResponse = (res, code, message) => {

	return res.status(code).json(
		{
			"success": false,
			"code": code,
			"message": message
		}
	)

}

const successResponse = (res, code, message) => {

	return res.status(code).json(
		{
			"success": true,
			"code": code,
			"message": message
		}
	)

}


module.exports = {
	errorResponse,
	successResponse
}