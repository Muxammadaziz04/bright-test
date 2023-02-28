const {Telegraf} = require("telegraf")
const path = require("path")
const fs = require("fs")
const app = new Telegraf("6245586674:AAFXgjqXWjOJ3JDMMjd9iwYs6gSVqPYMmdo")

module.exports = async ({title, desc, link}) => {
	const text = 
	`<b>${title || ""}</b>

	${desc || ""}

	<b>Batafsil: </b>${String(link) || ""}`
	await app.telegram.sendPhoto(
		"-1001601225733",
		{
			source: fs.readFileSync(
				path.resolve(__dirname, "../uploads/output/Futbol.png"),
			),
		},
		{
			caption: text,
			parse_mode: "HTML",
		},
	)
}
