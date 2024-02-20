import { logger } from "./logger.js"

export const pageNotFound = (req, res) => {
    logger.info("page not found")
    return res.status(404).render("errorPage.njk", {message : "Page not found, please try for some another page"})
}
export const serverError = (req, res) => {
    return res.status(500).render("errorPage.njk", {message : "server error, please try after sometime"})
}