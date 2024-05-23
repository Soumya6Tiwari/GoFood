const mongoose=require('mongoose')


// restructuring in javascript ie hum apne mongoose se schema ko nikal rahe hai
const { Schema }=mongoose;

//using schema
//creating schema for our user which we will use when we sign up a new user  in our react

const UserSchema =new Schema({
    name:
    {
        type: String,
        required: true
    },
    location:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    date:
    {
        type:Date,
        default: Date.now
    }
});

// to export the schema into mongodb atlas through mongoose
module.exports= mongoose.model('user',UserSchema)