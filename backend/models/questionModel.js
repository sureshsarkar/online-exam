const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
    subjectid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subjects',
        required: [true, 'Subjects ID is required']
    },
    courseid:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'courses',
       required:[true,'Course Id is required']
    },
    questiontext:{
        type:String,
        required:true,
        unique:true 
    },
    option1: {
        type: String,
        required:true
    },
    option2: {
        type: String,
        required:true
    },
    option3: {
        type: String,
        required:true
    },
    option4: {
        type: String,
        required:true
    },
    correctoption: {
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


 

const questionSchema = mongoose.model('questions',createSchema)
module.exports =questionSchema;

