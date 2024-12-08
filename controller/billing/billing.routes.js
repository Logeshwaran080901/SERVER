const Router=require('express').Router()
const billingContoller=require('./billing.controller')

Router.route('/bill').post(billingContoller.createBill).get(billingContoller.getAllBilledData)
module.exports=Router