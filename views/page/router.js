import  express  from "express"
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
   return deletePost(req,res,next)
})

router.get("/updatePost/:id", (req, res, next) => {
   return updatePost(req,res,next)
})

 //Api route to create fetch, create, delete, update data

 router.get("/api/getPost", (req, res, next) => {
    res.send(fakeData)
 })

 router.post("/api/getPost", (req, res, next) => {
    fakeData.push({...req.body, id: fakeData.length + 1 })
    res.json(fakeData)
 })

 router.delete("/api/deletePost/:id", (req, res, next) => {
    let newData = fakeData.filter(item => item.id != req.params.id)
    fakeData.splice(0, fakeData.length, ...newData)
    res.json(fakeData)
})

router.delete("/api/updatePost/:id", (req, res, next) => {
   let newData = fakeData.map(item => item.id === req.params.id ? {item, ...req.body} : item )
   fakeData.splice(0, fakeData.length, ...newData)
   res.json(fakeData)
})
 


export default router;