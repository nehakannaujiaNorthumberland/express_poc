import  express, { json }  from "express"
import { fetchAllPost, addPost, deletePost, editPost, updatePost} from "../controller/postController.js"
import fakeData from "../data/fakeData.js"
import { logger } from "../middleware/logger.js";
const router = express.Router();

router.get("/", (req, res, next) => {
   return fetchAllPost(req, res, next)
})

router.get('/:page', (req, res) => {
   logger.info(`Client connected. SessionId is ${req.session.id} and page is ${req.params.page} and ${req.query.hasError} and ${req.body}`)
   logger.info(`Errors are ${req.session?.userid}`)
   if (!req.query.hasError) {
       req.session.errorSummary = {};
       //find a good way to save/ clear session data
      if(req.params.page == "addPost"){
        req.session.formData = {}
        req.session.error = null;
      } 

   }
   logger.info(`Errors are ${req.session.errorSummary}`)
   return res.render(`page/${req.params.page}.njk`);
})


router.get("/addPost", (req, res, next) => {
    res.render("page/addPost.njk")
 })


 router.post("/addPost", (req, res, next) => {
    return addPost(req, res, next)
 })

 router.get("/deletePost/:id", (req, res, next) => {
   return deletePost(req,res,next)
})

router.get("/editPost/:id", (req, res, next) => {
   return editPost(req,res,next)
})

router.post("/updatePost/:id", (req, res, next) => {
   return updatePost(req,res,next)
})

 //Api route to create fetch, create, delete, update data

 router.get("/api/getPost", (req, res, next) => {
    res.send(fakeData)
 })

 router.get("/api/getPost/:id", (req, res, next) => {
   let newData = fakeData.filter(item => item.id == req.params.id)
    res.json(newData)
})


 router.post("/api/getPost", (req, res, next) => {
   logger.info("data befire pushing in json" + JSON.stringify(req.body))
    fakeData.push({...req.body})
    res.json(fakeData)
 })

 router.delete("/api/deletePost/:id", (req, res, next) => {
    let newData = fakeData.filter(item => item.id != req.params.id)
    fakeData.splice(0, fakeData.length, ...newData)
    res.json(fakeData)
})

router.put("/api/updatePost/:id", (req, res, next) => {
   let newData = fakeData.map(item => item.id == req.params.id ? {...req.body } : item)
   logger.info("newdata" + JSON.stringify(newData))
   fakeData.splice(0, fakeData.length, ...newData)
   res.json(fakeData)
})
 


export default router;