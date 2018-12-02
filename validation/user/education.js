const Validator = require('validator');
const isEmpty = require('../isEmpty');

module.exports = function validateEducationInput(data) {
    let errors = {};
    data.school = !isEmpty(data.school) ? data.school : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';
    data.fieldOfStudy = !isEmpty(data.fieldOfStudy) ? data.fieldOfStudy : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if (isEmpty(data.school)) {
        errors.school = "School field is required";
    }
    if (isEmpty(data.degree)) {
        errors.degree = "Degree field is required";
    }
    if (isEmpty(data.fieldOfStudy)) {
        errors.fieldOfStudy = "FieldOfStudy field is required";
    }
    if (isEmpty(data.from)) {
        errors.from = "From field is required";
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}