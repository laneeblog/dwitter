export default (req, res, next) => {
    const userName = req.query.username;
    const data = userName ? tweets.filter(v => v.username === userName) : tweets;
    res.status(200).json(data);
}