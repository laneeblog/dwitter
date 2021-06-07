import express from 'express';
import 'express-async-errors';
import { body } from 'express-validator';
import { validate } from '../middleware/validator.js'
import * as tweetController from '../controller/tweet.js';
import isAuth from '../middleware/auth.js'

const router = express.Router();

const validateTweet = [
    body('text').trim().isLength({ min: 10 }).withMessage("더 길게 작성해 주셈"),
    validate
]

// /tweets
// /tweets?username=:username
router.get('/', isAuth, tweetController.getTweet)

// /tweets/:id
router.get('/:id', isAuth, tweetController.getTweetById)

// /tweets
router.post('', isAuth, validateTweet, tweetController.postTweet)

// /tweets/:id
router.put('/:id', isAuth, validateTweet, tweetController.updateTweet)

// /tweets/:id
router.delete('/:id', isAuth, tweetController.deleteTweet)

export default router;
