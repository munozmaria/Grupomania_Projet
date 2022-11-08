const dotenv = require("dotenv")
dotenv.config()
const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
const mongo = require("./mongo")

const usersRoutes = require("./routes/user.js")
const postsRoutes = require("./routes/post.js")

//Middleware
app.use(cors())

app.use(express.json())


/*  router  */
app.use("/", usersRoutes)

app.use("/", postsRoutes)

app.get("/", (req, res) => {
	res.send(`Lstening on port 3000 💯`)
})
app.use("/images", express.static(path.join(__dirname, "images")))
app.use("../../dist/", express.static(path.join(__dirname, "dist")))

app.listen(process.env.PORT || 3000, () => console.log("serveur working 👍"))

module.exports = app
