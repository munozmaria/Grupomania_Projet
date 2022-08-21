const express = require("express")
const app = express()
const router = express.Router()
const { upload } = require("../middleware/multer")
const dotenv = require("dotenv")
dotenv.config()
//Controllers
const { createUser, logUser } = require("../controllers/users")

const {
	getUser,
	getUserImg,
	getUserbyId,
} = require("../middleware/authentication")

router.post("/api/auth/signup", createUser)
router.post("/api/auth/login", logUser)
router.post("/api/auth/getuser", getUser)
router.post("/api/auth/getuserimg", getUserImg)
router.post("/api/auth/getuserid", getUserbyId)

module.exports = router


