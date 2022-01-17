

const logger = require("./../../../util/logger");
const { findAllPolicyAccess, insertPolicyAccess } = require("./db-service/policy.db.service");
const { findPolicyById } = require("./db-service/policy.db");
module.exports = {
    addPolicyAccess: async (req,res) => {
        try {
            if(!req.body){
                return res.status(400).json({ success: false, message: 'invalid request!' }) 
            } else if(!(await findPolicyById(req.body.policy_id))){
                return res.status(400).json({ success: false, message: 'invalid policy id!' }) 
            }
            const policy = await insertPolicyAccess(req.body)
            return res.status(200).json({
                success: true,
                data: { _id: policy._id },
                message: 'Policy access added successfully'
            })
        } catch (error) {
            logger.error('addPolicy service err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    },

    getPolicyAccess: async (req,res) => {
        try {
            const policyAccess = await findAllPolicyAccess()
            return res.status(200).json({
                success: true,
                data: policyAccess,
                message: 'Policy access get successfully'
            })
        } catch (error) {
            logger.error('employee service getPolicyAccess err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    }
}