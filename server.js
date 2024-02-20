import express from "express"
import {logger} from "./middleware/logger.js"
import {pageNotFound, serverError} from "./middleware/errorHandler.js"
import nunjucks from "nunjucks"


const app = express()
const port = process.env.port || 3000 


//global error handling
app.use(pageNotFound, serverError)

//setup nunjucks templating engine
nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.get("/", (req,res) => {
    res.render("ncctemplate1.njk")
})

app.listen(port, (req,res) => {
    logger.info("server started")
})