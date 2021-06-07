import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js';
import isAuth from '../middleware/auth.js'

const router = express.Router();

// username, password, name, email, url
const validateCredential = [
    body('username').trim().notEmpty().isAlphanumeric().withMessage("Invalid username"),
    body('password').trim().isLength({ min: 4 }).isAlphanumeric().withMessage("Invalid password"),
    validate
]

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage("Invalid name"),
    body('email').isEmail().normalizeEmail().withMessage("Invalid email"),
    body('url').isURL().withMessage("Invalid url").optional({ nullable: true, checkFalsy: true }),
    validate
]

router.post('/login', validateCredential, authController.login)

router.post('/signup', validateSignup, authController.signup)

router.post('/me', isAuth, authController.me)

export default router;
