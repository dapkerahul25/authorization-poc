const Policy = require('../../models/policy-access')
const logger = require("../../../../util/logger");

module.exports = {
    //Insert Policy
    insertPolicyAccess: async (policyData) => {
        return new Promise(async (resolve, reject) => {
            try {
                let policy = await new Policy(policyData)
                policy['policy_access_id']= policy._id
                resolve(policy.save())
            } catch (error) {
                logger.error('insertPolicy err :' + error)
                reject(error)
            }
        })
    },

    //findAllPolicies
    findAllPolicyAccess: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Policy.find().exec())
            } catch (error) {
                logger.error('findAllPolicies err :' + error)
                reject(error)
            }
        })
    },

}