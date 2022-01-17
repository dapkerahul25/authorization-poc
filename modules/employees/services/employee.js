const { findAllEmployeeByManagerId, deleteEmployeeById, findEmployeeById } = require('../services/db-service/employee.db.service')
const logger = require("./../../../util/logger");

module.exports = {
    /* Get all employee by manager id */
    getAllEmployees: async (req, res) => {
        try {
            const employees = await findAllEmployeeByManagerId(req.tokenData.user_id)
            if (!employees) {
                return res.status(400).json({ message: "Employee not found!" });
            }
            return res.status(200).json({
                success: true,
                message: 'Employee get successfully',
                data: employees
            })
        } catch (error) {
            logger.error('employee service getAllEmployee err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    },

    /* Delete employee by _id */
    deleteEmployee: async (req, res) => {
        try {
            if (!req.params._id) {
                return res.status(400).json({ success: false, message: `Employee user id is reuired!` })
            }
            const isEmployeeExist = await findEmployeeById(req.params._id)
            if (!isEmployeeExist) {
                return res.status(400).json({ message: "Employee not found!" });
            }
            const employee = await deleteEmployeeById(req.params._id);
            if (!employee) {
                return res.status(400).json({ message: "Failed employee delete!" });
            }
            return res.status(200).json({
                success: true,
                message: 'Employee deleted successfully'
            })
        } catch (error) {
            logger.error('employee service deleteEmployee err :' + error)
            return res.status(500).json({ success: false, message: 'Error!', errors: error })
        }
    }
}