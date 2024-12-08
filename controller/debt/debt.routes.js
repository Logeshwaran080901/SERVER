const Router=require('express').Router()
const debtContoller=require('./debt.controller')

Router.route('/debt').post(debtContoller.createDebt).get(debtContoller.getAllDebt).put(debtContoller.debtPayed)
module.exports=Router