import * as userRepository from '../data/auth.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// TODO: make it secure!!!
const jwtSecretKey = "9Qb24593p4BBa3ryKLxU9rgkHsHEsphW";
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 12;

export async function signup(req, res, next) {
    const { username, password, name, email, url } = req.body;
    // 아이디 중복 확인
    const user = await userRepository.findByUsername(username);
    if (user) {
        return res.status(409).json({ message: `${username} already exists` })
    }
    // 비밀번호 해싱
    const hashed = await bcrypt.hash(password, bcryptSaltRounds);
    // 유저 세트 생성
    const userId = await userRepository.createUser({
        username,
        password: hashed,
        name,
        email,
        url
    });
    // 토큰 생성 
    const token = creatJWT(userId);
    res.status(201).json({ username, token });
}

export async function login(req, res, next) {
    const { username, password } = req.body;
    // usename 존재 확인
    const user = await userRepository.findByUsername(username);
    // 저장된 해싱 패스워드와 일치하는지 확인
    if (user) {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ message: "Invalid user or password" })
        }
    } else {
        return res.status(401).json({ message: "Invalid user or password" })
    }
    // 토큰 생성 
    const token = creatJWT(user.id);
    res.status(200).json({ username, token });
}

export async function me(req, res, next) {
    // 인증 검증이 끝났으면 db에서 id로 사용자 정보 가져오기
    const user = await userRepository.findById(req.userId);
    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ username: user.username, token: req.token })
}


const creatJWT = (id) => {
    return jwt.sign(
        {
            id,
            //isAdmin: false
        },
        jwtSecretKey,
        {
            expiresIn: jwtExpiresInDays
        }
    )
}