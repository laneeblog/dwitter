import * as tweetRepository from '../data/tweet.js'

export async function getTweet(req, res, next) {
    const userName = req.query.username;
    const data = await (userName ? tweetRepository.getByUsername(userName) : tweetRepository.getAll());
    res.status(200).json(data);
}

export async function getTweetById(req, res, next) {
    const id = req.params.id;
    const data = await tweetRepository.getById(id);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: `Tweet id ${id} not found` });
    }
}

export async function postTweet(req, res, next) {   // create tweet
    const { text, username, name } = req.body;
    const tweet = await tweetRepository.create(text, username, name);
    res.status(201).json(tweet);
}

export async function updateTweet(req, res, next) {   // update tweet
    const id = req.params.id;
    const text = req.body.text;
    const tweet = await tweetRepository.update(text, id);
    if (tweet) {
        res.status(200).json(tweet);
    } else {
        res.status(404).json({ message: `Tweet id ${id} not found` });
    }
}

export async function deleteTweet(req, res, next) {   // delete tweet
    const id = req.params.id;
    await tweetRepository.remove(id);
    res.sendStatus(204)
}