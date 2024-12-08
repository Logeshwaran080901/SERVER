const express = require('express');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debtSchema = require('./debt.schema')
async function createDebt(req, res) {
    try {
        let { creditername, description, amount, id } = req.body
        if (id) {
            debtSchema.findOneAndUpdate({ _id: new ObjectId(id), active: 1 }, {
                $set: {
                    creditername,
                    description,
                    amount
                },
            },
                { new: true }
            ).then(() => {
                res.status(200).send('Updated Successfully')
            }).catch(() => {
                res.status(404).send('Updation failed');
            });
        } else {
            let existing = await debtSchema.findOne({ creditername, description ,active:1})
            if (existing) {
                res.status(404).send("Already Added")
            } else {
                const user = await debtSchema.create({
                    creditername,
                    description,
                    amount,
                    active: 1
                });
                if (user) {
                    res.status(200).send("Saved Successfully")
                } else {
                    res.status(500).send("error")
                }
            }
        }

    } catch (error) {
        res.status(500).send(error.stack)
    }

}
async function getAllDebt(_, res) {
    try {
        let allDebt = await debtSchema.find({ active: 1 })
        res.status(200).send(allDebt)

    } catch (error) {
        console.log(error)
        res.status(500).send(error.stack)
    }
}
async function debtPayed(req,res) {
    try {
        let {id}=req.query
        debtSchema.findOneAndUpdate({ _id: new ObjectId(id), active: 1 }, {
            $set: {
                active:0
            },
        },
            { new: true }
        ).then((data) => {
            if(data){
                res.status(200).send('Updated Successfully')
            }else{
                res.status(404).send('Update Went Wrong')
            }
        }).catch(() => {
            res.status(404).send('Updation failed');
        });
    } catch (error) {
        res.status(500).send(error.stack)
    }
    
}

module.exports = {
    createDebt,
    getAllDebt,
    debtPayed
};