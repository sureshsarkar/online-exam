const studentModel = require('../models/studentModel');
const bcrypt = require('bcrypt');
const { generateTokenAndSetCookie } = require('../utils/generateToken');

exports.addStudent = async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;

        // Check if student already exists
        const user = await studentModel.findOne({ email });

        if (user) {
            return res.status(400).send({
                message: "Student already exists",
                success: false
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new student
        const newStudent = new studentModel({
            name,
            email,
            password: hashPassword,
            mobile
        });

        const token = generateTokenAndSetCookie(newStudent._id,null,res)

        // Save the student to the database
        await newStudent.save();

        return res.status(200).send({
            message: "Student added successfully",
            success: true,
            token:token
        });

    } catch (error) {
        return res.status(500).send({
            message: error.message,
            success: false
        });
    }
};



exports.getAll = async (req,res)=>{
    try {
        const students = await studentModel.find().select('-password');

        return res.status(200).send({
            message:"Got the students",
            success:true,
            students:students
        })
    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false
        })
    }
}

exports.loginStudent = async (req,res)=>{
    try {
        const {email,password} = req.body;
        
        if(email =='' || password ==''){
            return res.status(201).send({
                message:"Please fill the fields correctly",
                success:false
            })
        }

        const student = await studentModel.findOne({email}).select("-password");

        if(student ==''){
            return res.status(201).send({
                message:"No student found with this email",
                success:false
        })
    }

    const token = generateTokenAndSetCookie(student._id,null,res);
        return res.status(201).send({
            message:"Login successfully",
            success:true,
            student:student,
            token:token
    })

                 
    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false
        })
    }
}

exports.editStudent = async (req,res)=>{
    try {
        const id = req.params.id;

        const {name,email,mobile,status} = req.body;

        if(!name || !email || !mobile){
            const student = await studentModel.findById(id);
            return res.status(201).send({
                message:"Got Data",
                success:true,
                student:student
            })
        }

        const newStudent = {name,email,mobile,status};

         await studentModel.findByIdAndUpdate(id,newStudent);

        return res.status(200).send({
            message:"Student Updated",
            success:true,
            newStudent:newStudent
        })
    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false
        })
    }
}

exports.deleteStudent = async (req,res)=>{
    try {
        const id = req.params.id;
    if(!id){
        return res.status(201).send({
            message:"No Student found",
            success:false
        })
    }

        await studentModel.findByIdAndDelete(id);
        
        return res.status(200).send({
            message:"Student deleted successfully",
            success:true
        })
   
        
    } catch (error) {
        return res.status(201).send({

        });
    }
}
exports.logoutStudent = async (req,res)=>{
    try {
          // Clear the 'jwt' cookie
            res.clearCookie('jwt', {
                httpOnly: true,  // Prevents JavaScript from accessing the cookie (helps mitigate XSS)
                sameSite: 'Strict',  // Protects against CSRF attacks
            });
            
            return res.status(200).send({
                message:"Logout successfully",
                success:true
            })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false
        })
    }
}