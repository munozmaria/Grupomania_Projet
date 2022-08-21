import { createStore } from "vuex"
import axios from "axios"

export default createStore({
	state: {
		user: {},
		posts: [],
	},
	getters: {},
	mutations: {
		setPosts(state, posts) {
			state.posts = posts
		},
		addPost(state, post) {
			state.posts.push(post)
		},
		setUser(state, user) {
			state.user = user
		},

		deletePost(state, idPost) {
			console.log(state.posts)
			let index = state.posts.findIndex((post) => {
				return post._id == idPost
			})

			state.posts.splice(index, 1)
		},
		updateComments(state, { publicationId, idComment }) {
			let indexPost = state.posts.findIndex((post) => {
				return post._id == publicationId
			})
			let selectedPost = state.posts[indexPost]
			let indexComment = selectedPost.comments.findIndex((comment) => {
				return comment.idComment == idComment
			})
					state.posts[indexPost].comments.splice(indexComment, 1)

		},
		addComment(state, commentData) {
			//console.log(state, commentData)

			state.posts[commentData.index].comments.push({
				date: commentData.dateNow,
				idComment: commentData.idComment,
				newComment: commentData.newComment,
				userId: state.user._id,
				userPic: commentData.userPic,
			})
		},
		logOut(state, user) {
			state.user = user
			localStorage.clear()
		},
	},
	actions: {
		getPosts(state) {
			if (!localStorage.getItem("token")) {
				console.log("s'enregistrer d'abord")
			} else if (state.user === {}) {
				console.log("s'enregistrer d'abord")
			} else {
				const token = localStorage.getItem("token")
				const userId = localStorage.getItem("userId")
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
				axios.get("http://localhost:3000/api/post", config).then((res) => {
					console.log(res)
					if (res.status == 200) {
						this.commit("setPosts", res.data)
					} else {
						console.log("erreur")
					}
				})
			}
		},
		deletePost(state, publication) {
			const token = localStorage.getItem("token")
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: {
					publication,
				},
			}
			
			
			axios
				.delete(`http://localhost:3000/api/post/${this.state.user._id}`, config)
				.then((res) => console.log(res.data))
				.catch(() => {
					alert("vous n'êtes pas autorisé à supprimer ce post")
					window.location.reload()
				})
			state.commit("deletePost", publication._id)
		},

		addComment(context, { idPost, newComment }) {
			// console.log(idPost, newComment)
			const userId = localStorage.getItem("userId")
			const dateNow = Date.now()
			const idComment = `${idPost}${dateNow}`
			let index = this.state.posts.findIndex((post) => {
				return post._id == idPost
			})

			if (index > -1) {
				const token = localStorage.getItem("token")
				const config = {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}

				axios
					.post(
						`http://localhost:3000/api/post/${idPost}`,
						{
							userPic: this.state.user.picture,
							userId,
							newComment,
							date: dateNow,
							idComment,
						},
						config
					)
					.then((res) => console.log(res, "comment added .."))
					.catch((err) => console.log(err))
			}
			context.commit("addComment", {
				idPost,
				newComment,
				index,
				userPic: this.state.user.picture,
				dateNow,
				idComment,
			})
		},

		deleteComment(
			context,
			{ dateComment, publicationId, idComment, commentUserId }
		) {
			const token = localStorage.getItem("token")
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}

			
			axios
			.delete(
				`http://localhost:3000/api/post/${publicationId}/comment/${idComment}/date/${dateComment}/userId/${this.state.user._id}/commentUserId/${commentUserId}`,
				config
				)
				.then((res) => console.log(res.data))
				.catch(() => {
					alert("vous n'êtes pas autorisé à supprimer ce commentaire")
					window.location.reload()
				})
				context.commit("updateComments", { publicationId, idComment })
		},

		async getUser(state) {
			await axios
				.post("http://localhost:3000/api/auth/getuserid", {
					id: localStorage.getItem("userId"),
				})
				.then((res) => {
					if (res.status == 200) {
						if (res.data.user.picture === "") {
							res.data.user.picture =
								"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
						}
						this.commit("setUser", res.data.user)
					}
				})
				.catch((err) => {
					if (err) {
						console.log(err)
					}
				})
		},

		imageToUpload(imageUpload) {
			const token = localStorage.getItem("token")
			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "multipart/form-data",
				},
			}
			axios.post(`http://localhost:3000/api/post/`, imageUpload, config)
		},
	},

	modules: {},
})
