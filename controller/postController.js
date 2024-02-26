import { validationResult } from "express-validator";
import { fetchApiData, createPost, deleteApiPost, updateApiData} from "../lib/httpClient.js"
import { logger } from "../middleware/logger.js"
import { v4 as uuidv4 } from 'uuid';
import { json } from "express";
import {validateForm} from "../lib/validateForm.js"


const formValidaionRules = [{
                             field: 'userid', 
                             validator: (value) => typeof value === 'string' && value.trim() !== '',
                             message: 'user id is required and must be a non-empty string.' 
                            },
                            {
                                field: 'commenttitle', 
                                validator: (value) => typeof value === 'string' && value.trim() !== '',
                                message: 'title is required and must be a non-empty string.' 
                               },
                               {
                                field: 'comment', 
                                validator: (value) => typeof value === 'string' && value.trim() !== '',
                                message: 'user id is required and must be a non-empty string.' 
                               },
                        ]

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

        const errors = validateForm(formValidaionRules, req)
        console.log("erros validation" + JSON.stringify(req.session.errorSummary));
        if(errors?.errorList?.length > 0){
            return res.redirect("/addPost?hasError=true");
        }

        const data = { 
                        title: req.body.commenttitle,
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
        const data = { title: req.body.commenttitle,
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