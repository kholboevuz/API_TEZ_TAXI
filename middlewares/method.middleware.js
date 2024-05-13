const { userRegisterController, userFcmTokenUpdateController, userLoginController, addRegionController, getRegionController, checkUserController, sendOTPEskiz } = require('../controllers/user.controllers')
const Methods = require('../data/method.json')
const { errorResponse } = require('../utils/response')
const MethodMiddleware = (req, res) => {

	const method = req.body.params.method
	const data = req.body.params.body

	const inMethod = Methods.includes(method)

	if (!inMethod) {
		return errorResponse(res, 404, "Method not found")
	}
	if (method == 'FcmTokenUpdate') {
		userFcmTokenUpdateController(data, res)
	} else if (method == 'UserLogin') {
		userLoginController(data, res)
	} else if (method == 'AddRegion') {
		addRegionController(data, res)
	} else if (method == 'GetRegion') {
		getRegionController(data, res)
	} else if (method == 'CheckUser') {
		checkUserController(data, res)
	} else if (method == 'SendSMS') {
		sendOTPEskiz(data, res)
	}

}

module.exports = MethodMiddleware