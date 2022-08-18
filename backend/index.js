const express = require("express")
const app = express()
const port = 3000
const cors = require("cors")





//Middleware 
app.use(cors());


app.get("/login", (req, res) => {
	res.send("hola login")
})




app.get("/", (req, res) => {
	res.send(`Listening on port 3000 💯`)
})


app.listen(process.env.PORT || 3000, () => console.log("serveur working 👍"))