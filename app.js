const express = require('express')
const dotenv = require('dotenv')
const router = require('./routers/app.router')

const { connectDB } = require('./config/db')

dotenv.config()

const app = express()
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use(router)


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
	console.log("Server running on port", PORT)
})