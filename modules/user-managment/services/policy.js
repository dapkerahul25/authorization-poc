const logger = require("./../../../util/logger");
const { insertPolicy, findAllPolicies } = require('../services/db-service/policy.db')
module.exports = {
    addPolicy: async (req, res) => {
        try {
            if (!req.body) {
                return res.status(400).json({ success: false, message: 'invalid request!' })
            }

            const policy = await insertPolicy({ policy_name: req.body.policy_name })
            return res.status(200).json({
                success: true,
                data: { _id: policy._id },
                message: 'policy added successfully'
            })
        } catch (error) {
            logger.error('addPolicy service err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    },

    getPolicies: async (req, res) => {
        try {
            const policies = await findAllPolicies()
            return res.status(200).json({
                success: true,
                data: policies,
                message: 'policies get successfully'
            })
        } catch (error) {
            logger.error('employee service getAllEmployee err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    }
}