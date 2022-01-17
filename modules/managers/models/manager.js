let mongoose = require('mongoose')

/* Manager model schema */
let Manager = new mongoose.Schema({
    user_id: { type: String, required: true },
    joining_date: { type: Date, required: true },
    city:{ type: String, required: false },
    company: { type: String, required: true }
})

/* Export the model */
module.exports = mongoose.model('managers', Manager);



