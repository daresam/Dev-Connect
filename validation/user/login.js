const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateLoginInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
    if (isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!Validator.isLength(data.password, {
            min: 6,
            max: 50
        })) {
        errors.password = "Password must be atleast 6 characters";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}