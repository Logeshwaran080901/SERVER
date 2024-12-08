const Router=require('express').Router()
const companyContoller=require('./company.controller')

Router.route('/company').post(companyContoller.createCompany).get(companyContoller.getAllCompany)
module.exports=Router