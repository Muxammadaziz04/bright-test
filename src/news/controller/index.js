const multer = require("multer")
const path = require("path")
const slugify = require('slugify')
const {write, read} = require("../../utils/FS.js")
const CImage = require("../../utils/img.js")
const tg = require("../../utils/tg.js")

const writeDataNews = async (req, res) => {
	
	let fileName = String(Date.now()) + req.files?.img?.name.replace(/\s/g, "")
	fileName = fileName.toString()
	const imagepath = path.join(__dirname, "../../", "uploads/", fileName)

	const imgLink = "/uploads/" + fileName

	req.files?.img?.mv(imagepath)
	console.log(imgLink)

	req.body.slug = slugify(req.body.shortLink, {
		replacement: '-', 
		remove: /[*+~.()'"!:@]/g, 
		lower: false,   
		strict: false,   
		locale: 'vi',  
		trim: true        
	})

	if(typeof req.body.categories === 'string') {
		req.body.categories = [req.body.categories]
	}
	
	const data = req.body
	data.img = imgLink
	data.date = new Date()

	await CImage({
		imgPath: imgLink,
		txt: req.body.title,
		ctgs: req.body.categories,
		req,
	})
	
	await tg({
		title: req.body.title,
		desc: req.body.shortDesc,
		link: "https://bright-uzbekistan.vercel.app/news/" + req.body.slug,
	})
	
	const oldData = read("data")
	write("data", [...oldData, data])
	res.send(req.body)
}

const sendDataNews = (req, res) => {
	let data = read("data")
	data = data.reverse()	
	res.send(data)
}

module.exports = {writeDataNews, sendDataNews}
