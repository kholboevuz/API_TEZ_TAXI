const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
	{
		phonenumber: {
			type: Number,
			required: true,
			unique: true,
		},

		balance: {
			type: Number,
			default: 0
		},

		fcmToken: {
			type: String,
			required: true
		},

		bonusBalance: {
			type: Number,
			default: 0,
		},

		datatime: {
			type: String,
			required: true
		}

	},
	{ timestamps: true }
)

module.exports = mongoose.model('User', userSchema)