const Router=require('express').Router()
const labourContoller=require('./labour.controller')

Router.route('/labour').post(labourContoller.createLabour)
.get(labourContoller.getAllLabour)
module.exports=Router