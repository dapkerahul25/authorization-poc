const User = require('../../models/user')
const logger = require('../../../../util/logger')

module.exports = {
    //Get User
    findUserByEmailOrMobile: async (email, mobile) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await User.findOne({
                    $or: [
                        { email },
                        { mobile }
                    ]
                }).exec())
            } catch (error) {
                logger.error('findUserByEmailOrMobile err :' + error)
                reject(error)
            }
        })
    },

    //Insert User
    insertUser: async (user) => {
        return new Promise(async (resolve, reject) => {
            try {
                let userData = await new User(user)
                userData['user_id'] = userData._id
                resolve(userData.save())
            } catch (error) {
                logger.error('insertUser err :' + error)
                reject(error)
            }
        })
    }
}