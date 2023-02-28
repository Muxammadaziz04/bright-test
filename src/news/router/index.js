const express = require("express")
const {sendDataNews, writeDataNews} = require("../controller/index.js")

const router = express.Router()

router
    .get("/news", sendDataNews)
    .post("/news", writeDataNews)

module.exports = router
