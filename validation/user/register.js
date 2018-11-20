const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.password2 = !isEmpty(data.password2) ? data.password2 : '';

    if (!Validator.isLength(data.name, {
            min: 3,
            max: 20
        })) {
        errors.name = "Name must be between 3 and 20 characters";
    }
    if (isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }
    if (isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
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
    if (isEmpty(data.password2)) {
        errors.password2 = " Confirm Password field is required";
    }
    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = " Password must match";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}