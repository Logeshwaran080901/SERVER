const express = require('express');
const app = express();
const businessSchema=require('./business.schema');
async function createBusiness(req,res){
    try {
        let {businessname}=req.body
    let existing=await businessSchema.findOne({businessname})
    if(existing){
        res.status(404).send("Name Already existing")
    }else{
        const user = await businessSchema.create({ 
            businessname:businessname,
            active:1
          });
        if(user){
            res.status(200).send("account created")
        }else{
            res.status(500).send("err")
        }
    }
    } catch (error) {
        res.status(500).send(error.stack)
    }
    
}
async function  getAllBusiness(_,res) {
    try {
        let allBusiness=await businessSchema.find({active:1})
        if(allBusiness.length){
            res.status(200).send(allBusiness)
        }else{
            res.status(404).send('No Business   Records Found')
        }
    } catch (error) {
     res.status(500).send(error.stack)   
    }
}

module.exports = {
    createBusiness,
    getAllBusiness
  };