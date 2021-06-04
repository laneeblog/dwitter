import express from 'express';
import 'express-async-errors';
import tweets from '../data/tweets.js'

const router = express.Router();

router.get('/', (req, res, next) => {   // get tweets


    
    const userName = req.query.username;
    const data = userName ? tweets.filter(v => v.username === userName) : tweets;
    res.status(200).json(data);
})

router.get('/:id', (req, res, next) => {    // get tweet by id
    const id = req.params.id;
    const data = tweets.find(v => v.id === id);
    if(data) {
        res.status(200).json(data);
    }else {
        res.status(404).json({ message : `Tweet id ${id} not found`});
    }
})

router.post('', (req, res, next) => {   // create tweet
    const {text, username, name} = req.body;
    const tweet = {
        id: Date.now().toString(),
        text,
        createdAt: new Date(),
        name,
        username
    }
    tweets = [tweet, ...tweets];     // 지금 추가하는 것을 맨 앞으로 추가
    res.status(201).json(tweet);
})

router.put('/:id', (req, res, next) => {   // update tweet
    const id = req.params.id;
    const text = req.body.text;
    // tweets.some(v => {
    //     if (v.id == id) {
    //         v.text = text;
    //     }
    // })                               // 나의 방법
    const tweet = tweets.find(v => v.id === id);
    if(tweet) {
        tweet.text = text;
        res.status(200).json(tweet);
    }else {
        res.status(404).json({ message : `Tweet id ${id} not found`});
    }
})

router.delete('/:id', (req, res, next) => {   // delete tweet
    const id = req.params.id;
    tweets.some((v, i) => {
        if (v.id == id) {
            tweets.splice(i, 1);
        }
    })
    // tweets = tweets.filter(v => v.id !== id); > 앨리의 방법

    res.sendStatus(204)
})


export default router;
