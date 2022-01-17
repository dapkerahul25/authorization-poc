const { addPolicyAccess, getPolicyAccess } = require("../services/policy-access");
const Auth = require('../../../midlewares/auth')
const API_BASE = process.env.API_BASE;
const ResourcePolicies = require('../../../app-constants/resource-policies')
const VerifyPolicy = require('../../../midlewares/policy-verification')
module.exports = (app) => {
    /* Add Policy : using secure JWT authorization */
    app.post(API_BASE + '/policyAccess', Auth.checkAuth,VerifyPolicy(ResourcePolicies.RESOURCE_POLICIES), addPolicyAccess)

    /* Get Policies : using secure JWT authorization */
    app.get(API_BASE + '/policyAccess', Auth.checkAuth,VerifyPolicy(ResourcePolicies.RESOURCE_POLICIES),getPolicyAccess)

};








