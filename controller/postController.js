import { validationResult } from "express-validator";
import { fetchApiData, createPost, deleteApiPost, updateApiData} from "../lib/httpClient.js"
import { logger } from "../middleware/logger.js"
import { v4 as uuidv4 } from 'uuid';
import { json } from "express";
import {validateForm} from "../lib/validateForm.js"
import {addUpdatePostformValidationRules} from "../lib/formValidationRules.js"

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

        req.session.formData = req.body;

        const errors = validateForm(addUpdatePostformValidationRules, req);

        console.log("erros validation" + JSON.stringify(req.session.errorSummary));

        console.log("formData" + JSON.stringify(req.session.formData));

        if(errors?.errorList?.length > 0){
            return res.redirect("/addPost?hasError=true");
        }

        const results = await createPost("http://localhost:3000/api/getPost", {...req.body, id: uuidv4()})

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
        req.session.formData = results;
        return res.redirect("/updatePost")
    }
    catch(err){
        logger.error(err);
        return next(err);
    }
}

export const updatePost = async (req, res, next) => {
    try{
        const id = req.params.id;
        const errors = validateForm(addUpdatePostformValidationRules, req);

        console.log("erros validation" + JSON.stringify(req.session.errorSummary));

        console.log("formData" + JSON.stringify(req.session.formData));

        if(errors?.errorList?.length > 0){
            return res.redirect("/updatePost?hasError=true");
        }

        const results = await updateApiData(`http://localhost:3000/api/updatePost/${id}`, {...req.body, "id": id})
        logger.info("update" + JSON.stringify(results))
        return res.redirect("/")
    }
    catch(err){
        logger.error(err);
        return next(err);
    }
}