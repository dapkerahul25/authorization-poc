const PolicyAccessModel = require('../modules/user-managment/models/policy-access')
const VerifyPolicy = (policy_type, role) => {
    return async (req, res, next) => {
        try {

            const policy = await PolicyAccessModel.findOne({ policy_type, role:req.tokenData.role })

            if (!policy) {
                return res.status(403).json({ message: 'Permission denied!' })
            }
            if (req.method == 'GET') {
                if (policy.is_read) {
                    next()
                } else {
                    return res.status(403).json({ message: 'Permission denied!' })
                }
            } else if (req.method == 'POST') {
                if (policy.is_write) {
                    next()
                } else {
                    return res.status(403).json({ message: 'Permission denied!' })
                }
            } else if (req.method == 'PUT' || req.method == 'PATCH') {
                if (policy.is_update) {
                    next()
                } else {
                    return res.status(403).json({ message: 'Permission denied!' })
                }
            } else if (req.method == 'DELETE') {
                if (policy.is_delete) {
                    next()
                } else {
                    return res.status(403).json({ message: 'Permission denied!' })
                }
            } else {
                return res.status(403).json({ message: 'Permission denied!' })
            }
        } catch (error) {
            return res.status(403).json({ message: 'Permission denied!!' })
        }
    }


}
module.exports = VerifyPolicy;