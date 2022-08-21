const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

mongoose
	.connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("database connected 🔥"))
	.catch((error) => console.log("erreur connection" + error))

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

module.exports = { mongoose, User }
