module.exports=(app)=>{
    require('./../controllers/policy-access')(app)
    require('./../controllers/policy')(app)
}