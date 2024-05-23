const mongoose=require('mongoose')


// restructuring in javascript ie hum apne mongoose se schema ko nikal rahe hai
const { Schema }=mongoose;

//using schema
//creating schema for our user which we will use when we sign up a new user  in our react

const OrderSchema =new Schema({
    
    email:
    {
        type:String,
        required:true,
        unique:true
    },
    order_data:
    {
        type:Array,
        required:true
    }
});

// to export the schema into mongodb atlas through mongoose
module.exports= mongoose.model('order',OrderSchema)





