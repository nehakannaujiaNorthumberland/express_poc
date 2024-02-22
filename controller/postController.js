import { fetchApiData, createPost, deleteApiPost } from "../lib/httpClient.js"
import { logger } from "../middleware/logger.js"

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
        userId: req.body.userid}
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
        logger.info("postResults" + JSON.stringify(results))
        return res.render("page/updatePost.njk" , { results })
    }
    catch(err){
        logger.error(err);
        return next(err);
    }
}