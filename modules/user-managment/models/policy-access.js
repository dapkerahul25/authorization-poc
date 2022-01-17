let mongoose = require('mongoose')
let { policies } = require('../../../app-constants/resource-policies')

/* Policy model schema */
let PolicyAccess = new mongoose.Schema({
    role: { type: String, required: true },
    policy_id: { type: String, required: true },
    policy_type: { type: String, required: true, enum: policies },
    is_read: { type: Boolean, default: false, required: true },
    is_write: { type: Boolean, default: false, required: true },
    is_delete: { type: Boolean, default: false, required: true },
})

/* Export the model */
module.exports = mongoose.model('policy_access', PolicyAccess);
