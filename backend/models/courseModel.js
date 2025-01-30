const mongoose = require('mongoose')

const createSchema = new mongoose.Schema({
    coursename:{
        type:String,
        required:true,
        unique:true
    },
    status:{
        type:Number,
        default:1,
        enum: [1,2] 
    }
},{timeseries:true});

const courseSchema = mongoose.model('courses',createSchema);

module.exports = courseSchema;