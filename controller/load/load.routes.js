const Router=require('express').Router()
const loadContoller=require('./load.contoller')

Router.route('/load').post(loadContoller.createload).get(loadContoller.getLabourLoadData)
Router.route('/allload').get(loadContoller.getAllLoadData)
// .get(brokerContoller.getAllSender)
module.exports=Router