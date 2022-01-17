const {addPolicy,getPolicies} = require("../services/policy");
const Auth = require('../../../midlewares/auth')
const API_BASE = process.env.API_BASE;
const ResourcePolicies = require('../../../app-constants/resource-policies')
const VerifyPolicy = require('../../../midlewares/policy-verification')
module.exports = (app) => {
    /* Add Policy : using secure JWT authorization */
    app.post(API_BASE + '/policies', Auth.checkAuth,VerifyPolicy(ResourcePolicies.RESOURCE_POLICIES), addPolicy)

    /* Get Policies : using secure JWT authorization */
    app.get(API_BASE + '/policies', Auth.checkAuth,VerifyPolicy(ResourcePolicies.RESOURCE_POLICIES), getPolicies)

};








