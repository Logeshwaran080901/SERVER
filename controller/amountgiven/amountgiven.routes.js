const Router=require('express').Router()
const amountgivenContoller=require('./amountgiven.controller')

Router.route('/amountgiven').post(amountgivenContoller.createAmountGiven)
// .get(brokerContoller.getAllBroker)
module.exports=Router