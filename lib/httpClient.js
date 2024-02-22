import axios from "axios";
import { logger } from "../middleware/logger.js"

export const fetchApiData = async (url) => {   
    try{
      const results = await axios.get(url)
      return results.data
    }
    catch(err){
        return logger.error(`httpClient ${ err.mesaage }`)
    }
}

export const createPost = async (url, data) => {
    try{
        const results = await axios.post(url, data)
        return results.data
      }
      catch(err){
          return logger.error(`httpClient ${ err.mesaage }`)
      }

}

export const deleteApiPost = async (url) => {
    try{
        const results = await axios.delete(url)
        return results.data
      }
      catch(err){
          return logger.error(`httpClient ${ err.mesaage }`)
      }

}

export const updateApiPost = async (url, data) => {
    try{
        const results = await axios.put(url, data)
        return results.data
      }
      catch(err){
          return logger.error(`httpClient ${ err.mesaage }`)
      }

}