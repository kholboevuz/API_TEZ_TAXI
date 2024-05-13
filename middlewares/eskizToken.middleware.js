const axios = require('axios')
const dotenv = require('dotenv')
const smstokenModels = require('../models/smstoken.models')

dotenv.config()

const UpdateSmsToken = async (token) => {
	const data = {
		email: process.env.ESKIZ_EMAIL,
		password: process.env.ESKIZ_PASSWORD
	}

	try {
		const response = await axios.post('https://notify.eskiz.uz/api/auth/login', data)

		if (response.status !== 200) {
			throw new Error(`SMS tokenini yangilab boʻlmadi. Holat: ${response.status}`)
		}

		const newtoken = response.data.data.token

		const filter = { token }
		const tokenupdate = await smstokenModels.findOneAndUpdate(filter, {
			token: newtoken
		})

		console.log(tokenupdate)

	} catch (err) {
		console.error(err.message)
		throw err
	}
}

module.exports = UpdateSmsToken
