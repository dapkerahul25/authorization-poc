const { findAllManagerByCompany,deleteManagerById, findManagerById } = require('../services/db-service/manager.db.service')
const logger = require("./../../../util/logger");

module.exports = {
    /* Get all managers */
    getAllManagers: async (req, res) => {
        try {
            if (!req.params.company) {
                return res.status(400).json({ success: false, message: `company is reuired!` })
            }
            const managers = await findAllManagerByCompany(req.params.company)
            if (!managers) {
                return res.status(400).json({ message: "Manager not found!" });
            }
            return res.status(200).json({
                success: true,
                message: 'Managers get successfully',
                data: managers
            })
        } catch (error) {
            logger.error('getAllManagers err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    },

    /* Delete manager by _id */
    deleteManagerById: async (req, res) => {
        try {
            if (!req.params.id) {
                return res.status(400).json({ success: false, message: `Manager user id is reuired!` })
            }
            const isEmployeeExist = await findManagerById(req.params.id)
            if (!isEmployeeExist) {
                return res.status(400).json({ message: "Manager not found!" });
            }
            const manager = await deleteManagerById(req.params.id);
            if (!manager) {
                return res.status(400).json({ message: "Failed manager delete!" });
            }
            return res.status(200).json({
                success: true,
                message: 'Manager deleted successfully'
            })
        } catch (error) {
            logger.error('manager service deleteEmployee err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    }
}