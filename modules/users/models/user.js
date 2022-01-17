let mongoose = require('mongoose')
const {roles}= require('./../../../app-constants/roles')

/* user model schema */
let user = new mongoose.Schema({
    user_id:{ type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    country_code: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: roles },
})

/* Export the model */
module.exports = mongoose.model('users', user);



