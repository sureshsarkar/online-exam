const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:Number,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    status: 
    {
       type: Number,
       default:1,
       enum: [1,2]  // Assuming 2 is inactive, 1 is active
    }
}, { timestamps: true });

const studentSchema = mongoose.model('students',createSchema)
module.exports =studentSchema;

