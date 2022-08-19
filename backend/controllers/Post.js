const mongoose = require('mongoose')
const unlink = require('fs').promises.unlink

const { User } = require('../mongo')

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

const Publication = mongoose.model('Publication', postSchema)



function getPost(req, res) {
	let postsConImgs = []
	Publication.find().then((publications) => {
		publications.forEach((publication) => {
			
			postsConImgs.push(publication)
		})
		res.status(200).json(postsConImgs)
	})
}

function createPosts(req, res) {

	const date = Date.now()

	const { userId, userNamePost, content } = req.body

	const imageUrl = req.files.map((imageFile) => {
		return (
			req.protocol + '://' + req.get('host') + '/images/' + imageFile.filename
		)
	})

	const publication = new Publication({
		userId,
		userNamePost,
		content,
		date,
		imageUrl,
		likes: 0,
		usersLiked: [],
		comments: [],
	})
	publication
		.save()
		.then((message) => {
			res.status(201).send({ message })
			return
		})
		.catch((error) => res.status(500).send(error))
}

function createComment(req, res) {
	const postId = req.params.id
	

	Publication.findById(postId, function (err, post) {
		if (err) {
		
		} else {
	
			post.comments.push(req.body)

			post
				.save()
				.then((message) => {
					res.status(201).send({ message })
					return
				})
				.catch((error) => res.status(500).send(error))
		}
	})
}

function deleteComment(req, res) {
	const publicationId = req.params.publicationId
	const requestUserId = req.params.userId
	const idComment = req.params.idComment
	const commentUserId = req.params.commentUserId
	const date = req.params.date
	
	let pass = false

	
	User.findOne({ _id: requestUserId })
		.then((user) => {
			
			if (commentUserId == user._id) {
				
				pass = true
				
			} else if (user.admin) {
				pass = true
			
			} else {
				res.status(403).send({ message: "vous n'êtes pas autorisé à supprimer ce commentaire" })
			}
			

			if (pass === true) {
				Publication.findByIdAndUpdate(publicationId, {
					$pull: { comments: { idComment } },
				})

					.then(() => {
						res.status(201).send({ message: 'tout ok' })
						return
					})
					.catch((error) => res.status(500).send(error))
			}
		})
		.catch((err) => console.log(err))
}

function getOnePost(req, res) {
	const id = req.params.id
	return Publication.findById(id)
}

function getOnlyOnePost(req, res) {
	getOnePost(req, res)
		.then((publication) => modifyUpdateResponseClient(publication, res))
		.catch((error) => res.status(500).send({ message: error }))
}

function deletePost(req, res) {
	
	const requestUserId = req.params.id
	const publication = req.body
	console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqq', req.body);
	
	let pass = false
	console.log(requestUserId)
	console.log(publication.publication.userId)

	User.findOne({ _id: requestUserId }).then((user) => {
		if (requestUserId === publication.publication.userId) {
			pass = true
		} else if (user.admin) {
					console.log("eres el duadmieno")

			pass = true
		} else {
			res.status(403).send({ message: "vous n'êtes pas autorisé à supprimer ce post" })
		}
		if (pass) {
			Publication.findByIdAndDelete(req.body.publication._id)
				.then((publication) => deleteImageLocal(publication))

				.catch((error) =>
					res.status(500).send({ message: ' erreur' })
				)
		}
	})
}

function deleteImageLocal(dataResponse) {
	const imageUrl = dataResponse.imageUrl
	imageUrl.forEach((image) => {
		const imageToDelete = image.split('/').at(-1)
		unlink(`images/${imageToDelete}`).catch((error) => {
			console.log(error);
		})
	})
}

function modifyPost(req, res) {
	const params = req.params
	const id = params.id
	const newText = params.newText

	Publication.findByIdAndUpdate(
		id,
		{ content: newText },
		{ new: true },
		function (err, result) {
			if (err) {
				res.send(err)
			} else {
				console.log(result)
				res.send(result)
			}
		}
	)
}

function deletePreviousImage(publication) {
	if (publication == null || publication.imageUrl == '') {
		return
	} else {
		const imageDelete = publication.imageUrl.split('/').at(-1)
		return unlink(`images/${imageDelete}`).then(() => publication)
	}
}

function makeNewPayload(addImage, req) {
	if (!addImage) {
		return req.body
	} else {
		const payload = JSON.parse(req.body.content)
		payload.imageUrl =
			req.protocol + '://' + req.get('host') + '/images/' + req.file.filename
		return payload
	}
}

function modifyUpdateResponseClient(dataResponse, res) {
	if (dataResponse == null) {
		res.status(404).send({ message: 'Objet not found in database' })
	} else {
		return Promise.resolve(res.status(200).send(dataResponse)).then(
			() => dataResponse
		)
	}
}

function imageUpdateProfil(req, res) {
	

	const userId = req.body.userId

	const imageUrl =
		req.protocol + '://' + req.get('host') + '/images/' + req.file.filename

	User.findByIdAndUpdate(userId, { picture: imageUrl }, function (err, result) {
		if (err) {
			res.send(err)
		} else {
			res.send(result)
		}
	})
}

function likePost(req, res) {
	const { like, userId } = req.body
	

	getOnePost(req, res)
		.then((publication) => updateLike(publication, like, userId, res))
		.then((vote) => vote.save())
		.then((prod) => modifyUpdateResponseClient(prod, res))
		.catch((error) => res.status(500).send(error))
}

function updateLike(publication, like, userId, res) {
	

	if (like && !publication.usersLiked.includes(userId)) {
		publication.usersLiked.push(userId)
	} else if (!like) {
		publication.usersLiked = publication.usersLiked.filter(
			(id) => id !== userId
		)
	}
	publication.likes = publication.usersLiked.length
	return publication
}

module.exports = {
	getPost,
	createPosts,
	createComment,
	deleteComment,
	getOnlyOnePost,
	deletePost,
	imageUpdateProfil,
	modifyPost,
	likePost,
}
