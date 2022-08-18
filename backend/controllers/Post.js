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

/*
function getPost(req, res) {
    let postsConImgs = []
    Publication.find()
        .then((publications) => {
            publications
                .forEach((pub) => {
                    // console.log(pub.userId)
                    User.findOne({ _id: pub.userId }, { picture: 1 })
                        .then((user) => {
                        postsConImgs.push(user)
                    })
                })
                .then((res) => res.status(200).json(postsConImgs))
            .catch (() => res.status(500).json({ error: "couldn't get the users" }))
        })
        .catch((error) => res.status(500).send({msg: "la vida la ernura el amor !!"}))
}
*/

function getPost(req, res) {
	let postsConImgs = []
	Publication.find().then((publications) => {
		publications.forEach((publication) => {
			/*   test por si quieres actualizar la imagen  
            if (publication.comments.length > 0) {
                publication.comments.forEach(
                    (comment) => (comment.newComment = 'no me jodan mas !')
                )
            }
            */
			postsConImgs.push(publication)
		})
		res.status(200).json(postsConImgs)
	})
}

function createPosts(req, res) {
	console.log('necesito la foto')
	console.log(req.files)
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
	console.log(req.body)
	//const {userId, date, newComment} = req.body

	Publication.findById(postId, function (err, post) {
		if (err) {
			console.log(err)
		} else {
			console.log('Result : ', post)
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
	// variable para dejar borrar o no
	let pass = false

	// console.log(req.params)

	// tomamos el id del usuario que hace la request y traemos sus datos de la base de datos
	User.findOne({ _id: requestUserId })
		.then((user) => {
			// checkear si es el dueño del post
			// console.log(user)

			if (commentUserId == user._id) {
				console.log('eres dueño del comment')
				pass = true
				// checkear si el usuario es admin
			} else if (user.admin) {
				pass = true
				console.log('eres amin')
			} else {
				res.status(403).send({ message: 'no tienes permisos para hacer esto ' })
			}
			// borra el comment

			if (pass === true) {
				Publication.findByIdAndUpdate(publicationId, {
					$pull: { comments: { idComment } },
				})

					.then(() => {
						res.status(201).send({ message: 'todo ok' })
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
	console.log('borrando')
	const requestUserId = req.params.id
	const publication = req.body
	console.log(req.body.publication._id)
	let pass = false
	// dueño ?
	User.findOne({ _id: requestUserId }).then((user) => {
		if (requestUserId === publication.userId) {
			console.log('eres el dueño ')
			pass = true
		} else if (user.admin) {
			console.log('eres admin ')
			pass = true
		} else {
			res.status(403).send({ message: 'no tienes permisos para hacer esto ' })
		}
		if (pass) {
			Publication.findByIdAndDelete(req.body.publication._id)
				.then((publication) => deleteImageLocal(publication))

				.catch((error) =>
					res.status(500).send({ message: ' no encontre nada !!!' })
				)
		}
	})
}

function deleteImageLocal(dataResponse) {
	const imageUrl = dataResponse.imageUrl
	imageUrl.forEach((image) => {
		const imageToDelete = image.split('/').at(-1)
		unlink(`images/${imageToDelete}`)
	})
}

function modifyPost(req, res) {
	const params = req.params
	const id = params.id

	let addImage = req.file != null

	const payload = makeNewPayload(addImage, req)

	Publication.findByIdAndUpdate(id, payload)
		.then((dataResponse) => modifyUpdateResponseClient(dataResponse, res))
		.then((Publication) => {
			if (addImage) deletePreviousImage(Publication)
		})
		.catch((error) => res.status(500).send({ message: error }))
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
	console.log(req.file)

	const userId = req.body.userId

	const imageUrl =
		req.protocol + '://' + req.get('host') + '/images/' + req.file.filename

	User.findByIdAndUpdate(userId, { picture: imageUrl }, function (err, result) {
		if (err) {
			res.send(err)
		} else {
			console.log(result)
			res.send(result)
		}
	})
}

function likePost(req, res) {
	const { like, userId } = req.body
	console.log(like, userId)

	getOnePost(req, res)
		.then((publication) => updateLike(publication, like, userId, res))
		.then((vote) => vote.save())
		.then((prod) => modifyUpdateResponseClient(prod, res))
		.catch((error) => res.status(500).send(error))
}

function updateLike(publication, like, userId, res) {
	console.log('holaaaa', publication)

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
