const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


const jwt =require("jsonwebtoken");
const bcrypt= require("bcryptjs");
const jwtSecret= "MyNameIsEndToEndYouTubeChannel$#"




router.post("/createuser", [
     body('email', 'Invalid Email').isEmail(),
     body('name').isLength({ min: 5 }),
     body('password', 'Incorrect Password').isLength({ min: 5 })],
     async (req, res) => {

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          // creating salt variable
          const salt= await bcrypt.genSalt(10);
          let secPassword =await bcrypt.hash(req.body.password,salt)

          try {
               // yaha se jo bhi hoga vo hamare database me reflect hoga kyuki humne model bna rakha h which uses schema
               await User.create({
                    name: req.body.name,
                    password: secPassword,
                    email: req.body.email,
                    location: req.body.location
               })
               res.json({ success: true });
          }
          catch (error) {
               console.log(error)
               res.json({ success: false });
          }


     })








router.post("/loginuser", [
     body('email', 'Invalid Email').isEmail(),
     body('password', 'Incorrect Password').isLength({ min: 5 })]
     , async (req, res) => {


          const errors = validationResult(req);
          if (!errors.isEmpty()) {
               return res.status(400).json({ errors: errors.array() });
          }

          let email = req.body.email
          try {
               // yaha se jo bhi hoga vo hamare database me reflect hoga kyuki humne model bna rakha h which uses schema
               let userData = await User.findOne({ email });
               if (!userData) {
                    return res.status(400).json({ errors: "Try logging with correct credentials" });
               }
               const pwdCompare= await bcrypt.compare(req.body.password,userData.password)
               if (!pwdCompare) {
                    return res.status(400).json({ errors: "Try logging with correct credentials" });
               }
             
               // ab hum frontend me json ka success :true ke sath sath auth token bhi bhejenge and yaha pr niche data compulsory object hai ,kyuki jab hum signature
               //karte hai to ye cheej jaruri hai
               const data={
                    user:{
                         id:userData.id    //mongodb ke document ki object id le rahe hai
                    }
               }
             //sign karne ke liye hum auth token bhi bhejenge along with success ie in signature part of jwt token
             // yaha niche data is only our payload

               const authToken= jwt.sign(data,jwtSecret)    // yaha sign me hum chahe to expiry date bhi daal sakte hai jaise banking system me hota hai
               return res.json({ success: true, authToken:authToken });

          }
          catch (error) {
               console.log(error)
               res.json({ success: false });
          }


     })


module.exports = router;