const mongoose = require('mongoose')

const connectDB = async () => {
	const connectingusers = await mongoose.connect(process.env.MONGO_URI)
	console.log(`MongoDB connected to: ${connectingusers.connection.host}`)
}


module.exports = {
	connectDB
}