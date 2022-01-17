const jwt = require('jsonwebtoken')
const TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY
const REFRESH_PRIVATE_KEY = process.env.REFRESH_PRIVATE_KEY
const CipherObj = require('../util/encrypt')
const logger = require("../util/logger");

module.exports = {
    /* Handling endpoint authorization using JWT Token */
    checkAuth: async (req, res, next) => {
        try {
            if (req.header("accessToken")) {
                let decoded = jwt.verify(req.header("accessToken"), TOKEN_PRIVATE_KEY)
                if (decoded && typeof (decoded.payload) === 'string') {
                    let tokenDecryptData = await CipherObj.decryptPayload(decoded.payload)
                    if (tokenDecryptData && tokenDecryptData.user_id) {
                        req.tokenData = {
                            'user_id': tokenDecryptData.user_id,
                            email: tokenDecryptData.email,
                            role: tokenDecryptData.role
                        }
                    } else {
                        logger.warn('Authentication failed!')
                        return res.status(401).json({ message: "Authentication failed!" });
                    }
                    next();
                } else {
                    logger.warn('Authentication failed! Token encryption not verified! || Error : ' + err.toString());
                    return res.status(401).json({ message: "Authentication failed! Token encryption not verified!", errors: err });
                }
            } else {
                logger.warn('Authentication failed! Missing Auth Headers!');
                return res.status(401).json({ message: "Authentication failed! Missing Auth Headers" });
            }

        } catch (error) {
            logger.warn('JWT Error : ' + error);
            return res.status(401).json({ message: error.message, errors: { ...error, isTokenExpired: true } });
        }
    },

    /* Handling endpoint authorization using JWT Refresh Token */
    checkAuthRefreshToken: async (req, res, next) => {
        try {
            if (req.header("refreshToken")) {
                let decoded = await jwt.verify(req.header("refreshToken"), REFRESH_PRIVATE_KEY)
                if (decoded && typeof (decoded.payload) === 'string') {
                    let tokenDecryptData = await CipherObj.decryptPayload(decoded.payload)
                    if (tokenDecryptData && tokenDecryptData.user_id) {
                        req.refreshTokenData = {
                            'user_id': tokenDecryptData.user_id,
                            email: tokenDecryptData.email,
                            role: tokenDecryptData.role
                        }
                    } else {
                        logger.warn('Authentication failed!')
                        return res.status(401).json({ message: "Authentication failed!" });
                    }
                    next();
                } else {
                    logger.warn('Authentication failed! Token encryption not verified! || Error : ' + err.toString());
                    return res.status(401).json({ message: "Authentication failed! Token encryption not verified!", errors: err });
                }
            } else {
                logger.warn('Authentication failed! Missing Auth Headers!');
                return res.status(401).json({ message: "Authentication failed! Missing Auth Headers" });
            }

        } catch (error) {
            logger.warn('JWT Error : ' + error);
            return res.status(401).json({ message: error.message, errors: error });
        }
    }
};

function isTokenExpired(token) {
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson)
    const exp = decoded.exp;
    const expired = (Date.now() >= exp * 1000)
    return expired
}