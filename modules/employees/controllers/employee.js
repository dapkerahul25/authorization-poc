const {getAllEmployees,deleteEmployee} = require("../services/employee");
const Auth = require('../../../midlewares/auth')
const API_BASE = process.env.API_BASE;
const ResourcePolicies = require('../../../app-constants/resource-policies')
const VerifyPolicy = require('../../../midlewares/policy-verification')
module.exports = (app) => {
    /* Get all employee : using secure JWT authorization */
    app.get(API_BASE + '/employees', Auth.checkAuth,VerifyPolicy(ResourcePolicies.RESOURCE_EMPLOYEE), getAllEmployees)

    /* Delete employee : using secure JWT authorization */
    app.delete(API_BASE + '/employees/:_id', Auth.checkAuth,VerifyPolicy(ResourcePolicies.RESOURCE_EMPLOYEE), deleteEmployee)

};








