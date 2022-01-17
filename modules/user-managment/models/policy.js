let mongoose = require('mongoose')
let { policies } = require('../../../app-constants/resource-policies')
/* Policy model schema */
let Policy = new mongoose.Schema({
    policy_id: { type: String, required: true },
    policy_name: { type: String, required: true, enum: policies },

})

/* Export the model */
module.exports = mongoose.model('policies', Policy);



