const express = require('express')
const router = express.Router()
const Order=require('../models/Orders')
// creating end point
router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            // first ever order for that user matlab ki pehli baar kuch order kiya hai isliye create
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            // matlab user pehle se hi exist kar raha hai
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})



// ROUTES FOR MYORDER DATA
router.post('/myorderData', async (req, res) => {
    try{
        // my orders me jakar hum apne backend ko email bhej rahe hai so that vo find kar sake ki kaun sa user hai and response me hume hamara 
        //order history dede
       let myData= await Order.findOne({'email':req.body.email})
       res.json({orderData:myData})
    }
    catch(error){
        console.log(error.message)
        res.send("Server Error", error.message)
    }
})

module.exports=router;