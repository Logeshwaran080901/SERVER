const Router=require('express').Router()
const brokerContoller=require('./broker.controller')

Router.route('/broker').post(brokerContoller.createBroker)
.get(brokerContoller.getAllBroker)
module.exports=Router