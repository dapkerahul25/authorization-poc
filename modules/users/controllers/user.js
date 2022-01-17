const { userSignUp, userSignIn, validateReqBody, getToken } = require("../services/user.service");
const API_BASE = process.env.API_BASE;
const { checkAuthRefreshToken } = require('../../../midlewares/auth')

module.exports = (app) => {
    /* Sign up user */
    app.post(API_BASE + '/users/signup', validateReqBody, userSignUp)
    /* Sign in user */
    app.post(API_BASE + '/users/signin', userSignIn)

    /* Token by refresh token */
    app.post(API_BASE + '/users/token', checkAuthRefreshToken, getToken)

};








