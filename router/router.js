import  express  from "express"
import { v4 as uuidv4 } from 'uuid';
import { fetchAllPost, addPost, deletePost, updatePost} from "../controller/postController.js"
import fakeData from "../data/fakeData.js"
import { logger } from "../middleware/logger.js";
const router = express.Router();

router.get("/", (req, res, next) => {
   return fetchAllPost(req, res, next)
})

router.get("/addPost", (req, res, next) => {
    res.render("page/addPost.njk")
 })

 router.post("/addPost", (req, res, next) => {
    return addPost(req, res, next)
 })

 router.get("/deletePost/:id", (req, res, next) => {
  return deletePost(req, res, next)
})

router.get("/updatePost/:id", (req, res, next) => {
   return updatePost(req, res, next)
 })

 //Api route to create fetch, create, delete, update data

 router.get("/api/getPost", (req, res, next) => {
    res.send(fakeData)
 })

 router.post("/api/getPost", (req, res, next) => {
    fakeData.push({...req.body, id: uuidv4() })
    res.json(fakeData)
 })

 router.delete("/api/deletePost/:id", (req, res, next) => {
    let newData = fakeData.filter(item => item.id != req.params.id)
    fakeData.splice(0, fakeData.length, ...newData)
   res.json(fakeData)
})
 


export default router;