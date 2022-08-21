const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
	userId: String,
	userNamePost: String,
	content: String,
	imageUrl: [String],
	date: Number,
	likes: Number,
	usersLiked: [String],
	comments: [Object],
})

const Publication = mongoose.model("Publication", postSchema)

module.exports = { Publication }
