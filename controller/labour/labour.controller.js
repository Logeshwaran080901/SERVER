const mongoose = require('mongoose'); // Ensure mongoose is imported
const ObjectId = mongoose.Types.ObjectId; // Define ObjectId
const labourSchema = require('./labour.schema');
async function createLabour(req, res) {
    try {
        let { labourname,businessid } = req.body
        let existing = await labourSchema.findOne({ labourname })
        if (existing) {
            res.status(404).send("Name Already existing")
        } else {
            const user = await labourSchema.create({
                labourname,
                businessid,
                active: 1
            });
            if (user) {
                res.status(200).send("saved")
            } else {
                res.status(500).send("err")
            }
        }
    } catch (error) {
        res.status(500).send(error.stack)
    }

}
async function getAllLabour(req, res) {
    try {
        let {businessid}=req.query
        let allSender = await labourSchema.find({
            businessid: new ObjectId(businessid),
            active: 1
          });
        if (allSender.length) {
            res.status(200).send(allSender)
        } else {
            res.status(404).send('No Labour Records Found')
        }
    } catch (error) {
        res.status(500).send(error.stack)
    }
}

module.exports = {
    createLabour,
    getAllLabour
};