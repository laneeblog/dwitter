// npm i express cors helmet morgan express-async-errors
// npm i nodemon --save-dev

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import tweetsRoute from './router/tweets.js';
import authRoute from './router/auth.js'

// 앱 생성
const app = express();

// 기본 미들웨어 등록
app.use(express.json())
app.use(cors());
app.use(morgan('tiny'));
app.use(helmet())

// url 라우팅
app.use('/tweets', tweetsRoute);
app.use('/auth', authRoute);

// 등록 안 된 url 처리
app.use((req, res, next) => {   // 스니펫 만들기 - ctrl + shift + p > configure snippets > javascript.json
    res.sendStatus(404);
})

// 오류 처리
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})

app.listen(9090);

