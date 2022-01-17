module.exports = (app) => {
    /* API Routes of Users Module */
    require('../modules/users/routes/index')(app)

    /* API Routes of Managers Module */
    require('../modules/managers/routes/index')(app)

    /* API Routes of Employees Module */
    require('../modules/employees/routes/index')(app)

    /* API Routes of User Managment Module */
    require('../modules/user-managment/routes/index')(app)
}