const { jwtTokenByRefreshToken, jwtGenToken, bcryptHash, capitalizeFirstLetter } = require('./../../../util/common')
const Moment = require('moment')
const logger = require('./../../../util/logger')
const { findUserByEmailOrMobile, insertUser } = require('../services/db-service/user.db.service')
const { insertManager, findManagerById } = require('./../../managers/services/db-service/manager.db.service')
const { insertEmployee } = require('./../../employees/services/db-service/employee.db.service')
const roles = require('../../../app-constants/roles')
const ADMIN_ACCESS_KEY = process.env.ADMIN_ACCESS_KEY

module.exports = {

    /* User sign up */
    userSignUp: async (req, res) => {
        try {
            req.body.dob = Moment(req.body.dob).format("YYYY-MM-DD")
            req.body.password = await bcryptHash(req.body.password)
            let user = await findUserByEmailOrMobile(req.body.email, req.body.mobile);
            if (!user) {
                user = await insertUser(req.body);
                if (!user) {
                    return res.status(400).json({ message: "User sign up failed!" });
                }
                user = await findUserByEmailOrMobile(req.body.email, req.body.mobile);
                if (req.body.role == roles.MANAGER) {
                    await insertManager({
                        user_id: user._id,
                        joining_date: req.body.joining_date,
                        city: req.body.city,
                        company: req.body.company
                    })
                } else if (req.body.role == roles.EMPLOYEE) {
                    await insertEmployee({
                        user_id: user._id,
                        manager_id: req.body.manager_id,
                        emp_id: req.body.emp_id,
                        joining_date: req.body.joining_date,
                        city: req.body.city,
                        company: req.body.company
                    })
                }

                return res.status(200).json({
                    success: true,
                    data: { _id: user._id },
                    message: 'Signed up successfully'
                })
            } else {
                return res.status(201).json({ status_code: 201, message: `Email or Mobile already exist!` });
            }

        } catch (error) {
            logger.error('user service userSignUp err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    },

    /* User sign in */
    userSignIn: async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ success: false, message: `Invalid request!` })
            } else if (!req.body.username) {
                return res.status(400).json({ success: false, message: `Username required!` })
            } else if (!req.body.password) {
                return res.status(400).json({ success: false, message: `Password required!` })
            }
            let user = await findUserByEmailOrMobile(req.body.username, req.body.username);
            if (!user) {
                return res.status(401).json({ message: `Login Failed : Incorrect Email or Password!!` });
            }
            let { token, refreshToken } = await jwtGenToken(req.body, user)
            if (!token) {
                return res.status(401).json({ message: `Login Failed : Incorrect Email or Password!!` });
            }
            let loginData = {
                user_id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                token,
                refreshToken
            }
            return res.status(200).json({
                success: true,
                message: 'Signed in successfully',
                data: loginData
            })

        } catch (error) {
            logger.error('user service userSignIn err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    },

    /* User token by refresh token */
    getToken: async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ success: false, message: `Invalid request!` })
            }
            let { token } = await jwtTokenByRefreshToken({
                ...req.refreshTokenData,
                refreshToken: req.body.refreshToken
            })
            if (!token) {
                return res.status(401).json({ message: `Login Failed : Incorrect Email or Password!!` });
            }
            let loginData = {
                token
            }
            return res.status(200).json({
                success: true,
                message: 'token get successfully',
                data: loginData
            })

        } catch (error) {
            logger.error('user service userSignIn err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    },

    /* Validate user req body */
    validateReqBody: async (req, res, next) => {
        try {
            let requestData = req.body
            if (!requestData) {
                return res.status(400).json({ success: false, message: `Invalid request!` })
            } else if (!requestData.firstname) {
                return res.status(400).json({ success: false, message: `First name required!` })
            } else if (!requestData.lastname) {
                return res.status(400).json({ success: false, message: `Last name required!` })
            } else if (!requestData.password) {
                return res.status(400).json({ success: false, message: `Password required!` })
            } else if (!requestData.mobile) {
                return res.status(400).json({ success: false, message: `Mobile no required!` })
            } else if (!requestData.country_code) {
                return res.status(400).json({ success: false, message: `Country code required!` })
            } else if (!requestData.email) {
                return res.status(400).json({ success: false, message: `Email required!` })
            } else if (!requestData.role) {
                return res.status(400).json({ success: false, message: `Role required!` })
            } else if (!requestData.company) {
                return res.status(400).json({ success: false, message: `Company required!` })
            } else if (!requestData.joining_date) {
                return res.status(400).json({ success: false, message: `Joining date required!` })
            } else if (requestData.role == roles.EMPLOYEE && !(await findManagerById(requestData.manager_id))) {
                return res.status(400).json({ success: false, message: `Invalid manager id!` })
            } else if (requestData.role == roles.ADMIN && requestData.access_code != ADMIN_ACCESS_KEY) {
                return res.status(400).json({ success: false, message: `access code required!` })
            } else {
                requestData.firstname = await capitalizeFirstLetter(requestData.firstname)
                requestData.lastname = await capitalizeFirstLetter(requestData.lastname)
                next()
            }

        } catch (error) {
            logger.error('user service validateReqBody err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    }
}