const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

//Connection to database
const mongo = require('./mongo')

//Controllers
const { createUser, logUser } = require('./controllers/users')
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
} = require('./controllers/post')

//Middleware
app.use(cors())

app.use(express.json())

const {
	verifyUser,
	getUser,
	getUserImg,
	getUserbyId,
} = require('./middleware/authentication')

const { upload } = require('./middleware/multer')

//Routes
app.post('/api/auth/signup', createUser)
app.post('/api/auth/login', logUser)
app.post('/api/auth/getuser', getUser)
app.post('/api/auth/getuserimg', getUserImg)
app.post('/api/auth/getuserid', getUserbyId)
app.get('/api/post', verifyUser, getPost)
app.post('/api/post', verifyUser, upload.array('fileItems'), createPosts)
app.post('/api/post/:id', verifyUser, createComment)
app.delete(
	'/api/post/:publicationId/comment/:idComment/date/:date/userId/:userId/commentUserId/:commentUserId',
	verifyUser,
	deleteComment
)

app.post(
	'/api/post/file/profileImage',
	verifyUser,
	upload.single('image'),
	imageUpdateProfil
)

app.get('/api/post/:id', verifyUser, getOnlyOnePost)
app.put("/api/post/:id/:newText", verifyUser, modifyPost)
app.delete('/api/post/:id', verifyUser, deletePost)
app.post('/api/post/:id/like', verifyUser, likePost)

app.get('/', (req, res) => {
	res.send(`Lstening on port 3000 💯`)
})

app.use('/images', express.static(path.join(__dirname, 'images')))

app.listen(process.env.PORT || 3000, () => console.log('serveur working 👍'))

module.exports = app
