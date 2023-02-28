const express = require("express")
const multer = require("multer")
const path = require("path")

const app = express()
app.use(express.json())

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(__dirname, "/uploads"))
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
		cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname)
	},
})

const upload = multer({storage})

app.post("/upload", function (req, res) {
	let uploaded = upload.single({image: image})
	uploaded(req, res, function (err) {
		if (req.fileValidationError) {
			return res.send(req.fileValidationError)
		} else if (!req.file) {
			return res.send("Please select an image to upload")
		} else if (err instanceof multer.MulterError) {
			return res.send(err)
		} else if (err) {
			return res.send(err)
		}
	})
	res.json(uploaded)
})

app.listen(8000, console.log("server is running"))
