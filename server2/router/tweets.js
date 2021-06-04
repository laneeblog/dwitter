import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js'

const router = express.Router();

// /tweets
// /tweets?username=:username
router.get('/', tweetController.getTweet)

// /tweets/:id
router.get('/:id', tweetController.getTweetById)

// /tweets
router.post('', tweetController.postTweet)

// /tweets/:id
router.put('/:id', tweetController.updateTweet)

// /tweets/:id
router.delete('/:id', tweetController.deleteTweet)

export default router;
