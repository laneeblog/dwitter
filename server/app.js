import express from 'express';
import tweets from './data/tweets.js';
import cors from 'cors';

//import createDate from './util/date.js'

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200,
    credentials: true,  // Access-Control-Allow-Credentials: true
}))


app.get('/tweets', (req, res, next) => {
    const userName = req.query.username;
    if (userName === undefined) {               // get all tweets
        res.send(tweets);
    } else {
        const tweetsByUserName = [];            // get tweets by username
        tweets.forEach(v => {
            if (v.username === userName) {
                tweetsByUserName.push(v)
            }
        })
        res.send(tweetsByUserName)
    }
})

app.get('/tweets/:id', (req, res, next) => {    // get tweet by id
    const id = req.params.id;
    tweets.some(v => {
        if (v.id == id) {
            res.send(v);
        }
    })
})

app.post('/tweets', (req, res, next) => {   // create tweet
    const body = req.body;
    const id = body.id;
    const text = body.text;
    const createdAt = body.createdAt;
    const name = body.name;
    const username = body.username;
    let url = "";
    if (username === "lan") {
        url = "https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg";
    } else if (username === "bob") {
        url = "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png"
    } else {
        url = "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4-300x300.png"
    }
    tweets.push({ id, text, createdAt, name, username, url });

    res.sendStatus(201)
})

app.put('/tweets/:id', (req, res, next) => {   // update tweet
    const id = req.params.id;
    const text = req.body.text;
    tweets.some(v => {
        if (v.id == id) {
            v.text = text;
        }
    })

    res.sendStatus(200)
})

app.delete('/tweets/:id', (req, res, next) => {   // delete tweet
    const id = req.params.id;
    tweets.some((v, i) => {
        if (v.id == id) {
            tweets.splice(i, 1);
        }
    })

    res.sendStatus(200)
})



app.listen(9090)