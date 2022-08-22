const express = require("express")
const app = express()
const router = express.Router()
const dotenv = require("dotenv")
dotenv.config()
const { upload } = require("../middleware/multer")
const { verifyUser } = require("../middleware/authentication")

const {
	getPost,
	createPosts,
	createComment,
	deleteComment,
	getOnlyOnePost,
	deletePost,
	imageUpdateProfil,
	modifyPost,
	likePost,
} = require("../controllers/post")

router.get("/api/post", verifyUser, getPost)
router.post("/api/post", verifyUser, upload.array("fileItems"), createPosts)
router.post("/api/post/:id", verifyUser, createComment)
router.delete(
	"/api/post/:publicationId/comment/:idComment/date/:date/userId/:userId/commentUserId/:commentUserId",
	verifyUser,
	deleteComment
)

router.post(
	"/api/post/file/profileImage",
	verifyUser,
	upload.single("image"),
	imageUpdateProfil
)

router.get("/api/post/:id", verifyUser, getOnlyOnePost)
router.put("/api/post/:id/:publicationUserId/:newText/:userId/:userId", verifyUser, modifyPost)
router.delete("/api/post/:id", verifyUser, deletePost)
router.post("/api/post/:id/like", verifyUser, likePost)

module.exports = router
