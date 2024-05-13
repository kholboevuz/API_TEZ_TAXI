const User = require('../models/users.models')
const Region = require('../models/regions.models')
const axios = require('axios')
const FormData = require('form-data')
const { errorResponse, successResponse } = require('../utils/response')
const moment = require('moment-timezone')
const smstokenModels = require('../models/smstoken.models')
moment.tz.setDefault('Asia/Tashkent')
const datatime = moment().format('YYYY-MM-DD HH:mm:ss')


const userFcmTokenUpdateController = async (data, res) => {

	const { phonenumber, fcmToken } = data

	try {

		const validationPhonenumber = await User.findOne({ phonenumber })

		if (!validationPhonenumber) {
			return errorResponse(res, 404, 'Bunday raqamli foydalanuvchi mavjud emas')
		} else {
			const updateToken = await User.updateOne({ phonenumber }, { fcmToken })

			if (updateToken) {
				return successResponse(res, 200, "Muvaffaqiyatli yangilinadi")
			}
		}

	} catch (error) {
		console.log(error)
		return errorResponse(res, 500, `Server error ${error}`)
	}

}

const userLoginController = async (data, res) => {

	const { phonenumber, fcmToken } = data

	try {

		const validationPhonenumber = await User.findOne({ phonenumber })

		if (!validationPhonenumber) {
			const createUser = await User.create({
				phonenumber,
				datatime,
				fcmToken
			})
			return successResponse(res, 200, createUser)
		} else {
			const fcmUpdate = await User.updateOne({ phonenumber }, {
				fcmToken
			})
			if (fcmUpdate) {
				return successResponse(res, 200, validationPhonenumber)
			}
		}

	} catch (error) {
		console.log(error)
		return errorResponse(res, 500, `Server error ${error}`)
	}

}


const addRegionController = async (data, res) => {
	try {

		const { regionName } = data
		const addRegion = await Region.create({ name: regionName, datatime })

		if (addRegion) {
			return successResponse(res, 200, "Muvaffaqiyatli qo'shildi")
		}

	} catch (error) {
		console.log(error)
		return errorResponse(res, 500, `Server error ${error}`)
	}
}

const getRegionController = async (data, res) => {
	try {

		const regionData = await Region.find()

		return successResponse(res, 200, regionData)

	} catch (error) {
		console.log(error)
		return errorResponse(res, 500, `Server error ${error}`)
	}
}

const checkUserController = async (data, res) => {

	try {
		const { phonenumber } = data
		const userCheck = await User.findOne({ phonenumber })

		if (userCheck) {
			return successResponse(res, 200, 'Foydalanuvchi mavjud')
		} else {
			return errorResponse(res, 404, 'Foydaluvchi topilmadi')
		}

	} catch (error) {
		console.log(error)
		return errorResponse(res, 500, `Server error ${error}`)
	}

}

const sendOTPEskiz = async (data, res) => {

	// const tokendata = await smstokenModels.find()
	// const outtime = moment(tokendata[0].updatedAt).add(25, 'days').tz('Asia/Tashkent')

	const { phonenumber, code } = data
	try {

		// const gettoken = await SmsToken.find()
		// const token = gettoken[0].token

		// //token vaqtini tekshiradi
		// if (datatime.isAfter(outtime)) {
		// 		//agar vaqt utgan bo'lsa sms tokenni yangilash uchun surov yuboradi
		// 		UpdateSmsToken(token)
		// }else{

		// }
		const apiurl = 'https://notify.eskiz.uz/api/message/sms/send'

		const response = await axios.post(apiurl, {
			mobile_phone: phonenumber,
			message: `${code}`,
			from: '4546',
			callback_url: 'http://0000.uz/test.php',
		},
			{
				headers: {
					'Authorization': process.env.SMS_TOKEN,
				},
			})

		return successResponse(res, 200, 'Xabar yuborildi')

	} catch (error) {
		console.log(error)
	}
}


module.exports = {
	userFcmTokenUpdateController,
	userLoginController,
	addRegionController,
	getRegionController,
	checkUserController,
	sendOTPEskiz
}