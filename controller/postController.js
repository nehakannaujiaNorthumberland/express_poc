import { fetchApiData, createPost, deleteApiPost, updateApiData} from "../lib/httpClient.js"
import { logger } from "../middleware/logger.js"
import { v4 as uuidv4 } from 'uuid';

export const fetchAllPost = async (req, res, next) => {
    try{
   const results = await fetchApiData("http://localhost:3000/api/getPost")
   return res.render("page/home.njk", { results })
}
catch(err){
    logger.error(err);
    return next(err);
}

}

export const addPost = async (req, res, next) => {
    try{
        const data = { title: req.body.title,
        body: req.body.comment,
        userId: req.body.userid,
        id: uuidv4()
    }
        const results = await createPost("http://localhost:3000/api/getPost", data)

        return res.redirect("/")
    }
    catch(err){
        logger.error(err);
        return next(err);
    }

}

export const deletePost = async (req, res, next) => {
    try{
        const id = req.params.id
        const results = await deleteApiPost(`http://localhost:3000/api/deletePost/${id}`)

        return res.redirect("/")
    }
    catch(err){
        logger.error(err);
        return next(err);
    }
}

export const editPost = async (req, res, next) => {
    try{
        const id = req.params.id
        const results = await fetchApiData(`http://localhost:3000/api/getPost/${id}`)
        return res.render("page/updatePost.njk" , { results })
    }
    catch(err){
        logger.error(err);
        return next(err);
    }
}

export const updatePost = async (req, res, next) => {
    try{
        const id = req.params.id;
        const data = { title: req.body.title,
            body: req.body.comment,
            userId: req.body.userid,
            id: req.params.id
        }
        logger.info("data" + JSON.stringify(data))
        const results = await updateApiData(`http://localhost:3000/api/updatePost/${id}`, data)
        logger.info("update" + JSON.stringify(results))
        return res.redirect("/")
    }
    catch(err){
        logger.error(err);
        return next(err);
    }
}