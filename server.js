import express from "express"
import bodyParser from "body-parser";
import {logger} from "./middleware/logger.js"
import {pageNotFound, serverError} from "./middleware/errorHandler.js"
import nunjucks from "nunjucks";
import path from "path"
import Session from 'express-session';
import RedisStore from 'connect-redis';
import redis from 'redis';
import router from "./router/router.js";

const app = express()
const port = process.env.port || 3000 
const __dirname = path.resolve();

const client = redis.createClient({
    // Add your Redis server configuration here
    host: 'localhost',
    port: 6379,
    // Optionally, add a password if your Redis server requires authentication
    // password: 'your-redis-password',
  });

  (async () => {
    await client.connect();
  })();

  client.on("error", function (err) {
    logger.info(
      "Could not establish a connection with redis. " +
        err +
        "/n" +
        JSON.stringify(redisConfig)
    );
  });

  client.on("connect" , function () {
    logger.info("Connected to redis successfully");
  });

  app.use(
    Session({
      store: new RedisStore({ client: client }),
      secret: "nccproto2",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 15, //15 minute cookie lifespan
      },
    })
  );
  


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