import jwt from 'jsonwebtoken';
import * as userRepository from '../data/auth.js'

const AUTH_ERROR = { message: "Authentication error" }

export default (req, res, next) => {
    // 헤더에서 Authorization 값 가져오기
    const authHeader = req.get('Authorization');
    // Authorization 값 검증
    if (!(authHeader && authHeader.startsWith("Bearer "))) {
        return res.status(401).json(AUTH_ERROR);
    }
    // 헤더에서 Authorization 값(Bearer token)에서 토큰 분리하기
    const token = authHeader.split(' ')[1];
    // 토큰 검증
    jwt.verify(token,
        "9Qb24593p4BBa3ryKLxU9rgkHsHEsphW",
        async (error, decoded) => {
            // 이상한 토큰일 경우
            if (error) {
                return res.status(401).json(AUTH_ERROR);
            }
            // 해독한 결과에서 id 추출하여 db에 해당 유저 있는지 확인
            const user = await userRepository.findById(decoded.id);
            if (!user) {
                return res.status(401).json(AUTH_ERROR);
            }
            // 토큰에 상응하는 사용자 id를 req 헤더에 저장
            req.userId = user.id;
            // 다음 미들웨어로 이동
            next()
        });
}