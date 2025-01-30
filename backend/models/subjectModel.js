const mongoose = require('mongoose')

const createSchema = new mongoose.Schema({
    subjectname:{
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

const studentSchema = mongoose.model('subjects',createSchema);

module.exports = studentSchema;