const express = require("express")
const cors = require('cors')
const fileUpload = require("express-fileupload")
const path = require("path")
const app = express()
const router = require("./news/router/index.js")

app.use(cors());
app.use(express.json())
app.use(fileUpload())
app.use(express.static(path.join(__dirname)))
app.use(router)

app.listen(process.env.PORT || 8080, () => {
	console.log("yaxshiii")
})
