const mongoose = require('mongoose');

const createSchema  = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required:true
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
    ,
    role:
        {
            type: Number,
            required: true,
            default:1,
            enum: [1,2,3],// Assuming   1 Supper Admin, 2 Admin, 3 Editor
         }
    
}, { timestamps: true }) 

const userSchema = mongoose.model('users', createSchema);
module.exports = userSchema;