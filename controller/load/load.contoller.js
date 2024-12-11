const mongoose = require('mongoose'); // Ensure mongoose is imported
const ObjectId = mongoose.Types.ObjectId; // Define ObjectId
const jointloadSchema = require("./jointload.schema");
const loadSchema = require("./load.schema");
const { gettimestamp } = require('../../utils/dateUtils')
async function createload(req, res) {
    try {
        let { joint, labourid, companyid, brokerid, localweight, companyweight, fromlocation,type,tolocation, transport,date } = req.body
        let payedtolabour={payedtolabour:false}
        let payedtobroker={payedtobroker:false}
        let billed={billed:false}
        if (joint && joint.length) {
            let jointstringify = JSON.stringify(joint)
            await jointloadSchema.create({
                jointrecord: jointstringify,
                companyid,
                companyweight,
                date: gettimestamp(date),
                active: 1
            }).then(async (data) => {
                if (data) {
                    joint.forEach(v => {
                        v.jointid = data._id.toString()
                        v.companyid = companyid
                        v.companyweight = companyweight
                        v.tolocation = tolocation
                        v.payedtolabour=payedtolabour,
                        v.payedtobroker=payedtobroker,
                        v.billed=billed,
                        v.date = gettimestamp(date)
                        v.active=1
                    })
                    await loadSchema.create(joint).then((data) => {
                        if (data) {
                            res.status(200).send("saved")
                        } else {
                            res.status(404).send('saved went wrong2')
                        }
                    }).catch((error) => {
                        console.log(error)
                        res.status(404).send('Joint 2 failed');
                    });
                } else {
                    res.status(404).send('saved went wrong1')
                }
            }).catch((error) => {
                console.log(error)
                res.status(404).send('Joint 1 failed');
            });
        } else {
            await loadSchema.create({
                labourid,
                companyid,
                brokerid,
                date: gettimestamp(date),
                localweight,
                companyweight,
                payedtolabour,
                payedtobroker,
                billed,
                fromlocation,
                tolocation,
                transport,
                type,
                active: 1
            }).then((data) => {
                if (data) {
                    res.status(200).send("saved")
                } else {
                    res.status(404).send('saved went wrong')
                }
            }).catch((err) => {
                console.log(err)
                res.status(404).send('failed');
            });
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error.stack)
    }

}

async function getLabourLoadData(req, res) {
    try {
        await loadSchema.aggregate([
            {
                $match: { [req.query.for]: new ObjectId(req.query.id) } // Filtering orders with status 'completed'
            },
            // First $lookup stage to join labour data
            {
                $lookup: {
                    from: 'labour', // Corrected collection name to match Mongoose model name convention (usually plural)
                    localField: 'labourid',
                    foreignField: '_id',
                    as: 'labourData'
                }
            },
            // Second $lookup stage to join broker data
            {
                $lookup: {
                    from: 'brokers', // Collection name of the broker data
                    localField: 'brokerid',
                    foreignField: '_id',
                    as: 'brokerData'
                }
            },
            // third $lookup stage to join company data
            {
                $lookup: {
                    from: 'companies', // Collection name of the broker data
                    localField: 'companyid',
                    foreignField: '_id',
                    as: 'companyData'
                }
            },
            // Unwind the labourData array
            {
                $unwind: '$labourData'
            },
            // Unwind the brokerData array
            {
                $unwind: '$brokerData'
            },
            // Unwind the brokerData array
            {
                $unwind: '$companyData'
            },
            // Project the necessary fields
            {
                $project: {
                    _id: 1,
                    labourid: 1,
                    brokerid: 1,
                    companyid: 1,
                    date: 1,
                    localweight: 1,
                    companyweight: 1,
                    fromlocation: 1,
                    tolocation: 1,
                    billeddate: 1,
                    payedtobroker: 1,
                    payedtolabour: 1,
                    active: 1,
                    labourname: '$labourData.labourname', // Include the labour name from the joined labour data
                    brokername: '$brokerData.brokername',  // Include the broker name from the joined broker data
                    companyname: '$companyData.companyname'  // Include the broker name from the joined broker data
                }
            }
        ])
            .then(results => {
                console.log(results);
            })
            .catch(err => {
                console.error(err);
            });



    } catch (error) {
        console.log(error)
        res.status(500).send(error.stack)
    }

}

async function getAllLoad(req, res) {
    try {
        await loadSchema.aggregate([
            // Convert labourid, brokerid, and companyid to ObjectId if they are not empty
            {
                $addFields: {
                    labourid: {
                        $cond: {
                            if: { $or: [{ $eq: ["$labourid", ""] }, { $eq: ["$labourid", null] }] },
                            then: null,
                            else: { $toObjectId: "$labourid" }
                        }
                    },
                    brokerid: { $toObjectId: "$brokerid" },
                    companyid: { $toObjectId: "$companyid" }
                }
            },
            // First $lookup stage to join labour data
            {
                $lookup: {
                    from: 'labour', // Collection name of the labour data
                    localField: 'labourid',
                    foreignField: '_id',
                    as: 'labourData'
                }
            },
            // Second $lookup stage to join broker data
            {
                $lookup: {
                    from: 'brokers', // Collection name of the broker data
                    localField: 'brokerid',
                    foreignField: '_id',
                    as: 'brokerData'
                }
            },
            // Third $lookup stage to join company data
            {
                $lookup: {
                    from: 'companies', // Collection name of the company data
                    localField: 'companyid',
                    foreignField: '_id',
                    as: 'companyData'
                }
            },
            // Unwind the labourData array, handle missing labourid
            {
                $unwind: {
                    path: '$labourData',
                    preserveNullAndEmptyArrays: true // Keep documents without labourData
                }
            },
            // Unwind the brokerData array
            {
                $unwind: {
                    path: '$brokerData',
                    preserveNullAndEmptyArrays: true // Keep documents without brokerData
                }
            },
            // Unwind the companyData array
            {
                $unwind: {
                    path: '$companyData',
                    preserveNullAndEmptyArrays: true // Keep documents without companyData
                }
            },
            // Project the necessary fields
            {
                $project: {
                    _id: 1,
                    labourid: 1,
                    brokerid: 1,
                    companyid: 1,
                    jointid:1,
                    date: 1,
                    localweight: 1,
                    companyweight: 1,
                    fromlocation: 1,
                    tolocation: 1,
                    billed: 1,
                    payedtobroker: 1,
                    payedtolabour: 1,
                    active: 1,
                    type:1,
                    transport:1,
                    labourname: '$labourData.labourname', // Include the labour name from the joined labour data
                    brokername: '$brokerData.brokername',  // Include the broker name from the joined broker data
                    companyname: '$companyData.companyname'  // Include the company name from the joined company data
                }
            }
        ])
            .then(results => {
                if(results.length){
                    results.sort((a, b) => a.date - b.date);
                    res(200,results);
                }else{
                    res(404,"Load Data Not Found")
                }
            })
            .catch(err => {
                res(500,err)
            });



    } catch (error) {
        console.log(error)
        res(500,error.stack)
    }

}

async function getAllLoadData(req,res) {
    try {
        getAllLoad(req,(loadStatus,loadData)=>{
            res.status(loadStatus).send(loadData)
        })
        
    } catch (error) {
        res.status(500).send(error.stack)   
    }
}

module.exports = {
    createload,
    getLabourLoadData,
    getAllLoadData,
    getAllLoad
}
