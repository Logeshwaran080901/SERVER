const express = require('express');
const mongoose = require('mongoose'); // Ensure mongoose is imported
const ObjectId = mongoose.Types.ObjectId; // Define ObjectId
const brokerSchema = require('./broker.schema');
async function createBroker(req, res) {
    try {
        let { brokername,businessid } = req.body
        let existing = await brokerSchema.findOne({ brokername })
        if (existing) {
            res.status(404).send("Name Already existing")
        } else {
            const user = await brokerSchema.create({
                brokername,
                businessid,
                active: 1
            });
            if (user) {
                res.status(200).send("account created")
            } else {
                res.status(500).send("err")
            }
        }
    } catch (error) {
        res.status(500).send(error.stack)
    }

}
async function getAllBroker(req, res) {
    try {
        let {businessid}=req.query
        let allBroker = await brokerSchema.find({
            businessid: new ObjectId(businessid),
            active: 1
          });
        if (allBroker.length) {
            res.status(200).send(allBroker)
        } else {
            res.status(404).send('No Broker Records Found')
        }
    } catch (error) {
        res.status(500).send(error.stack)
    }
}

module.exports = {
    createBroker,
    getAllBroker
};