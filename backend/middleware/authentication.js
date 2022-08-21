const jwt = require("jsonwebtoken")
const { User } = require("../models/userModel")


function verifyUser(req, res, next) {
	const header = req.headers.authorization
	
	if (header == null)
		return res.status(403).send({ message: "There's no token 👎" })

	const token = header.split(" ")[1]

	if (token == null)
		return res.status(403).send({ message: "Token invalid 👎" })

	jwt.verify(token, process.env.tokenPword, (err, decoded) => {
		if (err)
			return res.status(403).send({ messageee: "Token invalid 👎" + err })

		next()
	})
}

function getUser(req, res) {
	if (
		req.headers.authorization === undefined ||
		req.headers.authorization === ""
	) {
		return res.status(403).send({ message: "There's not token 👎" })
	} else {
		const token = req.headers.authorization.split(" ")[1]

		if (token) {
			jwt.verify(token, process.env.tokenPword, async (err, decoded) => {
				if (err) {
					return res.status(403).send({ messageee: "Token invalid 👎" + err })
				} else {
				
					let user = await User.findOne({ email: decoded.email })
					return res.status(200).send({ user })
				}
			})
		}
	}
}

async function getUserImg() {
	if (
		req.headers.authorization === undefined ||
		req.headers.authorization === ""
	) {
		return res.status(403).send({ message: "There's no token 👎" })
	} else {
		const token = req.headers.authorization.split(" ")[1]
	
		if (token) {
			jwt.verify(token, process.env.tokenPword, async (err, decoded) => {
				if (err) {
					return res.status(403).send({ messageee: "Token invalid 👎" + err })
				} else {
					
					let user = await User.findOne({ email: decoded.email })
					return res.status(200).send({ pic: user.picture })
				}
			})
		}
	}
}

async function getUserbyId(req, res) {
	
	const id = req.body.id

	let user = await User.findById(id)
	return res.status(200).send({ user })
}

module.exports = { verifyUser, getUser, getUserbyId, getUserImg }
