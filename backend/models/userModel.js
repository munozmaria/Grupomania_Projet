const uniqueValidator = require("mongoose-unique-validator")
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	picture: {
		type: String,
		required: false,
	},
	admin: {
		type: Boolean,
		required: false,
	},
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model("User", userSchema)

module.exports = { User }
