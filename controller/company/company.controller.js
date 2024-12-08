const mongoose = require('mongoose'); // Ensure mongoose is imported
const ObjectId = mongoose.Types.ObjectId; // Define ObjectId
const companySchema = require('./company.schema');
async function createCompany(req, res) {
    try {
        let { companyname,businessid } = req.body
        let existing = await companySchema.findOne({ companyname })
        if (existing) {
            res.status(404).send("Name Already existing")
        } else {
            const user = await companySchema.create({
                companyname,
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
async function getAllCompany(req, res) {
    try {
        let {businessid}=req.query
        let allCompany = await companySchema.find({
            businessid: new ObjectId(businessid),
            active: 1
          });
        if (allCompany.length) {
            res.status(200).send(allCompany)
        } else {
            res.status(404).send('No Company Records Found')
        }
    } catch (error) {
        res.status(500).send(error.stack)
    }
}

module.exports = {
    createCompany,
    getAllCompany
};