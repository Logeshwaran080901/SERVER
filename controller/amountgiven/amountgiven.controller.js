const { gettimestamp } = require("../../utils/dateUtils");
const amountgivenSchema = require("./amountgiven.schema");

async function createAmountGiven(req,res) {
    try {
        req.body.date= gettimestamp(req.body.date)
        await amountgivenSchema.create({
            ...req.body,
            active: 1
        }).then((data) => {
            if (data) {
                res.status(200).send("saved")
            } else {
                res.status(404).send('saved went wrong')
            }
        }).catch(() => {
            res.status(404).send('failed');
        });
    } catch (error) {
        res.status(500).send(error.stack)
    }
    
}
module.exports={
    createAmountGiven
}