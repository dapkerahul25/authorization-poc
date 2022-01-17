const { deleteManagerById,getAllManagers } = require("../services/manager");
const API_BASE = process.env.API_BASE;
const ResourcePolicies = require('../../../app-constants/resource-policies')
const VerifyPolicy = require('../../../midlewares/policy-verification')
module.exports = (app) => {
    /* Get managers */
    app.get(API_BASE + '/managers/:company', VerifyPolicy(ResourcePolicies.RESOURCE_MANAGER),getAllManagers)

    /* Delete manager by id */
    app.delete(API_BASE + '/managers/:id', VerifyPolicy(ResourcePolicies.RESOURCE_MANAGER),deleteManagerById)

};








