// validator.js

import { logger } from "../middleware/logger.js";

export const validateForm = (validationRules, req) => {
    {
        const errorList = []
        req.session.errorSummary = null;
        req.session.error = {key : "form field errors are stored here"};
  
      // Perform custom validation based on the provided rules
      validationRules.forEach((rule) => {
        const { field, validator, message } = rule;
        const value = req.body[field];
  
        if (!validator(value)) {
            errorList.push({ "href": `#${field}`, "name": field, "text": message });
            req.session.error[field] = { text : `${message}`}
        }
      });

      logger.info("field errror field" + JSON.stringify(req.session.error.userid))

      if(errorList?.length > 0){
        req.session.errorSummary = {"titleText":"Fix the following errors", "errorList" : [...errorList] }
        return req.session.errorSummary
      }
    }

  };
  
  const isValidEmail = (email) => {
    // Implement a simple email validation logic (customize as needed)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Example usage:
  export const exampleValidationRules = [
    { field: 'username', validator: (value) => typeof value === 'string' && value.trim() !== '', message: 'Username is required and must be a non-empty string.' },
    { field: 'email', validator: isValidEmail, message: 'Email is required and must be a valid email address.' },
    // Add more validation rules as needed
  ];
  