const studentModel = require('../models/studentModel');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const { generateTokenAndSetCookie,getIdFromToken } = require('../utils/generateToken');

exports.addStudent = async (req, res) => {
    try {
     
        const { name, email, password, mobile,gender } = req.body;

        if(!name || !email || !password || !mobile || !gender){
            return res.status(201).send({
                message: "Fill the fields",
                success: false
            });
        }
        // Check if student already exists
        const user = await studentModel.findOne({ email });
    
        if (user) {
            return res.status(201).send({
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
            mobile,
            gender
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

        const student = await studentModel.findOne({email, status: 1});

        if (!student) {
            return res.status(201).send({
                message: 'Unauthorized Login',
                success: false
            });
        }


        // compare password
        const isMatch = await bcrypt.compare(password, student.password);

        if (!isMatch) {
            return res.status(400).send({
                message: 'Email or password is incorrect',
                success: false
            });
        }

        const token =  generateTokenAndSetCookie(student._id, null,res);
 
        return res.status(200).send({
             message: 'Student found and logged in successfully',
             success: true,
             token: token
        });


  

                 
    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false
        })
    }
}

exports.profile = async (req,res)=>{

    try{
    const tokenData =  getIdFromToken(req,res);
    const id = tokenData.userId;

    const profile = await studentModel.findById(id);

        if(!profile){
            const profile = await userModel.findById(id);

            return res.status(200).send({
                message:"Got the student profile data",
                success:true,
                student:profile
            })  
        }
    return res.status(200).send({
        message:"Got the student profile data",
        success:true,
        student:profile
    })
    

    }catch(error){
        return res.status(201).send({
            message:error.message,
            success:false
        })
    }
}

exports.editStudent = async (req,res)=>{
    try {
        const id = req.params.id;

        const {name,email,mobile,status,gender} = req.body;

        if(!name || !email || !mobile || !gender){
            const student = await studentModel.findById(id);
            return res.status(201).send({
                message:"Got Data",
                success:true,
                student:student
            })
        }

        const newStudent = {name,email,mobile,status,gender};

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