let mongoose = require('mongoose')

/* Employee model schema */
let Employee = new mongoose.Schema({
    manager_id: { type: String, required: true },
    user_id: { type: String, required: true },
    emp_id: { type: String, required: false },
    joining_date: { type: Date, required: false },
    city: { type: String, required: false },
    company: { type: String, required: true }
})

/* Export the model */
module.exports = mongoose.model('employees', Employee);



