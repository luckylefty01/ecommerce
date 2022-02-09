const jwt = require("jsonwebtoken");
const router = require("./auth");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) res.status(403).json("Invalid Token!");
            req.user = user
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated!")
    }
};

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("Access Denied!")
        }
    });
}

module.exports = { verifyToken, verifyTokenAndAuthorization };