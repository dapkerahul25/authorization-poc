const Manager = require('../../models/manager')
const logger = require("./../../../../util/logger");

module.exports = {
    //Insert Manager
    insertManager: async (manager) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await new Manager(manager).save())
            } catch (error) {
                logger.error('insertManager err :' + error)
                reject(error)
            }
        })
    },

    //Update Manager by id
    updateManagerById: async (_id, manager) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Manager.findOneAndUpdate({ _id },
                    {
                        firstname: manager.firstname,
                        lastname: manager.lastname,
                        emp_id: manager.emp_id,
                        city: manager.city,
                        mobile: manager.mobile,
                        joining_date: manager.joining_date
                    }))
            } catch (error) {
                logger.error('updateManagerById err :' + error)
                reject(error)
            }
        })
    },

    //Get Manager by id
    findManagerById: async (_id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const manager = await Manager.findOne({ user_id: _id }).exec()
                resolve(manager)
            } catch (error) {
                logger.error('findManagerById err :' + error)
                reject(error)
            }
        })
    },

    //GetAllManagers
    findAllManagerByCompany: async (company) => {
        return new Promise(async (resolve, reject) => {
            try {
                const managers = await Manager.aggregate([
                    {
                        $lookup: {
                            from: "users",
                            localField: "user_id",
                            foreignField: "user_id",
                            as: "managers"
                        }
                    },
                    {
                        $match: {
                            "company": company
                        }
                    },
                    {
                        $project: {
                            "managers.user_id": 1,
                            "managers.firstname": 1,
                            "managers.lastname": 1,

                        }
                    }
                ])
                resolve(managers)//await Manager.find({ company }).exec())
            } catch (error) {
                logger.error('findAllManagerByManagerId err :' + error)
                reject(error)
            }
        })
    },


    //Delete Manager
    deleteManagerById: async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await Manager.deleteOne({ _id: id }))
            } catch (error) {
                logger.error('deleteManagerById err :' + error)
                reject(error)
            }
        })
    },
}