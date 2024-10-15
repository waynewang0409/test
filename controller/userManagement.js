import express from "express";
import jwt from "jsonwebtoken";

const api = express.Router();
const app = express();

const JWT_SECRET = "mknjksvhw;fjrl'gfjj;dkjeiofjiwohf;skldjfklrfwf;wkrfhwruhwohgwndspor";

export const authentication = (req, res) => {

    console.log(req.body.loginID);
    console.log(req.body.loginPassword);

    let setToken = {
        loginID: req.body.loginID,
        userName: "nameABC",
    }

    // toker expired in 60 seconds
    let token = jwt.sign(
        JSON.parse(JSON.stringify(setToken)),
        JWT_SECRET,
        { expiresIn: 600 }
    )

    // 回傳認證成功 JWT Token
    res.json({
        success: true,
        login_check: true,
        password_check: true,
        message: '成功...',
        token: token,
        loginID: setToken.loginID,
        userName: setToken.username
    })

    res.status(200);

    return res;

};

export const verifyTokenTest = (req, res) => {
    return res.status(200).json("verifyTokenTest ok");
}

// Verify Token
// Token Format : header:Authorization , Token:Bearer <access_token>
export function verifyToken(req, res, next) {
    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
    console.log("verify Token", token);
    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: 'token 認證錯誤'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.status(403).json({
            success: false,
            message: '沒有提供 token 做驗證'
        });
    }
}