const mongoose = require('mongoose');

const createSchema = new mongoose.Schema({
    studentid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'students',
        required:true
    },

    questionid:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'questions',
        required:true
    }],

    selectedoption:[{
        type:String
    }],

    totaltime:{
        type:String,
        default:"0"
    },

    totalquestion:{
        type: Number,
        default:0
    },

    totalattempt:{
        type: Number,
        default:0
    },

    correctanswer:{
        type: Number,
        default:0
    },
    totalmarks:{
        type: Number,
        default:0
    },
    status: 
    {
       type: Number,
       default:1,
       enum: [1,2]  // Assuming 2 is inactive, 1 is active
    }

}, { timestamps: true })
 

const examSchema = mongoose.model('exams',createSchema);

module.exports = examSchema;