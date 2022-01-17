const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const saltRounds = Number(process.env.BCRYPT_SALT_ROUND)
const EncryptObj = require('./encrypt')
const TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY
const REFRESH_PRIVATE_KEY = process.env.REFRESH_PRIVATE_KEY
const logger = require('./../util/logger')

/* Generate token on sign in */
exports.jwtGenToken = (reqData, userData) => {
    return new Promise((resolve, reject) => {
        try {
            bcrypt.compare(reqData.password, userData.password).then(async (result) => {
                if (result) {
                    let payload = await EncryptObj.encryptPayload(JSON.stringify({ 'user_id': userData._id, 'email': userData.email ,'role': userData.role}))
                    const token = await jwt.sign(payload, TOKEN_PRIVATE_KEY, { expiresIn: 300 });
                    const refreshToken = await jwt.sign(payload, REFRESH_PRIVATE_KEY);
                    resolve({ token, refreshToken })
                }
                else {
                    logger.error(`jwtGenToken : authentication failed. Password doesn't match`)
                    resolve(false)
                }
            })
                .catch((err) => {
                    logger.error('jwtGenToken : Exception occurred while jwt token generation Error :' + err)
                    resolve(false)
                })
        } catch (error) {
            logger.error('jwtGenToken : Exception occurred while jwt token generation Error : ' + error)
            resolve(false)
        }

    })

}

/* Generate token on sign in */
exports.jwtTokenByRefreshToken = (userData) => {
    return new Promise(async(resolve, reject) => {
        try {
            let payload = await EncryptObj.encryptPayload(JSON.stringify({ 'user_id': userData._id, 'email': userData.email,'role': userData.role }))
            const token = await jwt.sign(payload, TOKEN_PRIVATE_KEY, { expiresIn: 300 });
            const refreshToken = await jwt.sign(payload, REFRESH_PRIVATE_KEY);
            resolve({ token, refreshToken })
        } catch (error) {
            logger.error('jwtGenToken : Exception occurred while jwt token generation Error : ' + error)
            reject(error)
        }

    })

}

/* Convert plain password to hash password */
exports.bcryptHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                logger.error('bcryptHash : Error occcurred while password hashing process! Error :' + err)
                reject(false)
            } else if (hash) {
                resolve(hash)
            }
        })
    })

}

/* Uppercase first letter of string */
exports.capitalizeFirstLetter = (string) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(string.charAt(0).toUpperCase() + string.slice(1))
        } catch (error) {
            resolve(string)
        }
    })
}


