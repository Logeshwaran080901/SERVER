const Router=require('express').Router()
const businessContoller=require('./business.controller')

Router.route('/business').post(businessContoller.createBusiness).get(businessContoller.getAllBusiness)
module.exports=Router