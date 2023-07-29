const { body, validationResult } = require('express-validator');

const validateData = [
    body('id').notEmpty().isInt(),
    body('name').notEmpty().isString(),
    body('continent').notEmpty().isString(),
    body('rank').notEmpty().isString(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateData,
};