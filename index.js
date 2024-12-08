require("dotenv").config()
const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser=require("body-parser")
const db=require("./config/db")

const router=require('./routes/routes')
app.use(express.json());
app.use(cors());
db


app.use(bodyParser.urlencoded({extended:true}))

app.use("/",router)


app.listen(process.env.PORT,function (){
    console.log(`App listen at port ${process.env.PORT}`);

});
