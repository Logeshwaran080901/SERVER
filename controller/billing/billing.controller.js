const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const { gettimestamp } = require("../../utils/dateUtils");
const loadSchema = require("../load/load.schema");

const billingSchema = require("./billing.schema");
const { getAllLoad } = require('../load/load.contoller');

async function createBill(req, res) {
    try {
        req.body.date = gettimestamp(req.body.date)
        await billingSchema.create({
            ...req.body,
            active: 1
        }).then(async (data) => {
            if (data) {
                const filter = {};
                if (req.body.ids && req.body.ids.length > 0 && req.body.jointid && req.body.jointid.length > 0) {

                    updatemany({ _id: { $in: req.body.ids } }, req.body.type, data, (updatestatus, updatedata) => {
                        if (updatestatus === 200) {
                            updatemany({ jointid: { $in: req.body.jointid } }, req.body.type, data, (updatestatus1, updatedata1) => {
                                if (updatestatus1 === 200) {
                                    res.status(200).send(`${updatedata + updatedata1} updated document`)
                                } else {
                                    res.status(updatestatus1).send(updatedata1)
                                }
                            })
                        } else {
                            res.status(updatestatus).send(updatedata)
                        }
                    })
                }
                // Add _id to the filter if provided and valid
                else if (req.body.ids && req.body.ids.length > 0) {
                    filter._id = { $in: req.body.ids };
                    updatemany(filter, req.body.type, data, (updatestatus, updatedata) => {
                        if (updatestatus === 200) {
                            res.status(200).send(`${updatedata} updated document`)
                        } else {
                            res.status(updatestatus).send(updatedata)
                        }
                    })
                }

                // Add jointid to the filter if provided and valid
                else if (req.body.jointid && req.body.jointid.length > 0) {
                    filter.jointid = { $in: req.body.jointid };
                    updatemany(filter, req.body.type, data, async (updatestatus, updatedata) => {
                        if (updatestatus === 200) {
                            res.status(200).send(`${updatedata} updated document`)
                        } else {
                            res.status(updatestatus).send(updatedata)
                        }
                    })
                }

            } else {
                res.status(404).send('something went wrong while billing')
            }
        }).catch((err) => {
            console.log(err);
            res.status(404).send('failed');
        });
    } catch (error) {
        console.log(error)
        res.status(500).send(error.stack)
    }

}
async function updatemany(req, type, data, res) {
    try {
        const result = await loadSchema.updateMany(
            { ...req, [type]: { [type]: false } },
            { $set: { [type]: { [type]: true, billid: data._id } } }
        );
            res(200, result.modifiedCount)

        // if (!result.modifiedCount) {
            // await billingSchema.deleteOne({ _id: data._id })
                // .then(async (data1) => {
                    // if (data1.deletedCount) {
                        // res(404, 'already billed')
                    // } else {
                        // res(404, 'wows something thing is wrong')
                    // }
                // })
                // .catch((err) => {
                    // console.log(err);
                    // res(404, 'failed');
                // });
        // } else {
        // }
    } catch (error) {
        res(500, error)
    }
}

async function getAllBilledData(req, res) {
    try {
        await getAllLoad(req, async (loadstatus, loadData) => {
            if (loadstatus === 200) {
                await billingSchema.find().then(async (billedData) => {
                    if (billedData.length) {
                        let billrec= JSON.parse(JSON.stringify(billedData))
                        billrec.forEach(v => {
                            v.billingrecord = JSON.parse(v.billingrecord)
                        });
                        loadData.forEach(lo => {
                            if (lo.labourid && lo.payedtolabour.payedtolabour) {
                                let bill =[]
                                 billrec.filter(bil=>{
                                    if(bil.labourid===lo.labourid.toString()){
                                        bil.billingrecord.find(rec=>{
                                            if(rec._id===lo._id.toString()){
                                                bill.push(rec)
                                            }
                                        })
                                    }
                                })
                                lo.payedtolabour.rate = Number(bill[0].rate)
                                lo.payedtolabour.amount = Number(bill[0].totalamount)
                            }
                            if (lo.brokerid && lo.payedtobroker.payedtobroker) {
                                let bill = []
                                billrec.filter(bil=>{
                                    if(bil.brokerid===lo.brokerid.toString()){
                                        bil.billingrecord.find(rec=>{
                                            if(rec._id===lo._id.toString()){
                                                bill.push(rec)
                                            }
                                        })
                                    }
                                })
                                lo.payedtobroker.rate = Number(bill[0].rate)
                                lo.payedtobroker.amount = Number(bill[0].totalamount)
                            }
                            if (lo.companyid && lo.billed.billed) {
                                if (lo.jointid) {
                                    let bill = []
                                    billrec.filter(bil=>{
                                        if(bil.companyid===lo.companyid.toString()){
                                            bil.billingrecord.find(rec=>{
                                                if(rec.jointid===lo.jointid.toString()){
                                                    bill.push(rec)
                                                }
                                            })
                                        }
                                    })
                                    lo.billed.rate = Number(bill[0].rate)
                                    lo.billed.amount = Number(bill[0].totalamount)
                                } else {
                                    let bill = []
                                    billrec.filter(bil=>{
                                        if(bil.companyid===lo.companyid.toString()){
                                            bil.billingrecord.find(rec=>{
                                                if(rec._id===lo._id.toString()){
                                                    bill.push(rec)
                                                }
                                            })
                                        }
                                    })
                                    lo.billed.rate = Number(bill[0].rate)
                                    lo.billed.amount = Number(bill[0].totalamount)
                                }
                            }
                        })
                        await res.status(200).send(loadData)

                    } else {
                        res.status(200).send(loadData)
                    }
                }).catch((err) => {
                    console.log(err)
                    res.status(404).send('failed');
                });
            } else {
                res.status(loadstatus).send(loadData)
            }
        })

    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    createBill,
    getAllBilledData
}
