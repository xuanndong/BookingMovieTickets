import { body, validationResult } from 'express-validator';

const createValidator = [
    body('username', 'Username is required and must be 5-50 characters')
        .trim().isLength({ min: 5, max: 50 }),
    body('email')
        .trim().isEmail(),   
    body('password')
        .isLength({ min: 8, max: 50 }).withMessage('Password must be between 8 and 50 characters')
        .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one digit')
        .matches(/[^\W\s]/).withMessage('Password must contain at least one special character'),
    
    // Sanitize all fields to prevent XSS attacks
    body('*').escape(),

    // PROCESS REQUEST AFTER VALIDATION & SANITIZATION
    async (req, res, next) => {
        // EXTRACT VALIDATION ERRORS FROM REQUEST
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors });
        }
        else {
            next();
        }
    },
];

export default {
    createValidator,
};