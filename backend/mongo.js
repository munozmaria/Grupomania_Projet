const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

mongoose
	.connect(process.env.URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("database connected 🔥"))
	.catch((error) => console.log("erreur connection" + error))

module.exports = { mongoose }
