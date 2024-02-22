import express from "express"
import bodyParser from "body-parser";
import {logger} from "./middleware/logger.js"
import {pageNotFound, serverError} from "./middleware/errorHandler.js"
import nunjucks from "nunjucks";
import path from "path"
import router from "./router/router.js"

const app = express()
const port = process.env.port || 3000 
const __dirname = path.resolve();


//server static files
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setup nunjucks templating engine
nunjucks.configure(["node_modules/govuk-frontend/dist", "views"], {
    autoescape: true,
    express: app
})
app.use(router)

//global error handling
app.use(pageNotFound, serverError)

app.listen(port, (req,res) => {
    logger.info("server started");
})