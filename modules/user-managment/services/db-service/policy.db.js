const Policy = require('../../models/policy')
const logger = require("../../../../util/logger");

module.exports = {
    //Insert Policy
    insertPolicy: async (policyData) => {
        return new Promise(async (resolve, reject) => {
            try {
                let policy = await new Policy(policyData)
                policy['policy_id']= policy._id
                resolve(policy.save())
            } catch (error) {
                logger.error('insertPolicy err :' + error)
                reject(error)
            }
        })
    },

    //findAllPolicies
    findAllPolicies: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Policy.find().exec())
            } catch (error) {
                logger.error('findAllPolicies err :' + error)
                reject(error)
            }
        })
    },

    //findPolicyById
    findPolicyById: async (policy_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Policy.findOne({policy_id}).exec())
            } catch (error) {
                logger.error('findPolicyById err :' + error)
                reject(error)
            }
        })
    },


}