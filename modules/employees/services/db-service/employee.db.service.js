const Employee = require('../../models/employee')
const User = require('../../../users/models/user')
const logger = require("../../../../util/logger");

module.exports = {
    //Insert Employee
    insertEmployee: async (employee) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await new Employee(employee).save())
            } catch (error) {
                logger.error('insertEmployee err :' + error)
                reject(error)
            }
        })
    },

    //Update Employee by id
    updateEmployeeById: async (_id, employee) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Employee.findOneAndUpdate({ _id },
                    {
                        firstname: employee.firstname,
                        lastname: employee.lastname,
                        emp_id: employee.emp_id,
                        city: employee.city,
                        mobile: employee.mobile,
                        joining_date: employee.joining_date
                    }))
            } catch (error) {
                logger.error('updateEmployeeById err :' + error)
                reject(error)
            }
        })
    },

    //Get Employee by id
    findEmployeeById: async (_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Employee.findOne({ _id }).exec())
            } catch (error) {
                logger.error('findEmployeeById err :' + error)
                reject(error)
            }
        })
    },

    //GetAllEmployees
    findAllEmployeeByManagerId: async (manager_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const employees = await Employee.aggregate([
                    {
                        $lookup: {
                            from: "users",
                            localField: "user_id",
                            foreignField: "user_id",
                            as: "employees"
                        }
                    },
                    {
                        $match: {
                            "manager_id": manager_id
                        }
                    },
                    {
                        "$project": {
                            "employees.firstname": 1,
                            "employees.lastname": 1,
                            "employees.email": 1,
                            "employees.mobile": 1,
                            'employees.country_code': 1
                        }
                    }
                ])
                resolve(employees)
            } catch (error) {
                logger.error('findAllEmployeeByManagerId err :' + error)
                reject(error)
            }
        })
    },


    //Delete Employee
    deleteEmployeeById: async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Employee.deleteOne({ _id: id }))
            } catch (error) {
                logger.error('deleteEmployeeById err :' + error)
                reject(error)
            }
        })
    },
}