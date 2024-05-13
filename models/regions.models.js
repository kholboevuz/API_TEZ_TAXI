const mongoose = require("mongoose")

const regionModels = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true
		},
		datatime: {
			type: String,
			required: true
		}

	},
	{ timestamps: true }
)

module.exports = mongoose.model('Region', regionModels)