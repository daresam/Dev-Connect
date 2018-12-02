const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateExperienceInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';


    if (isEmpty(data.title)) {
        errors.title = "Title field is required";
    }
    if (isEmpty(data.company)) {
        errors.company = "Company field is required";
    }
    if (isEmpty(data.from)) {
        errors.from = "From field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}