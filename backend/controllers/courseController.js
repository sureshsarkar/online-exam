const courseModel = require("../models/courseModel")


exports.addCourse = async (req, res)=>{
    try {
       const {coursename} = req.body;
       if(!coursename){
            return res.status(201).send({
                message:"Fill the field",
                success:false 
            })
       } 

       const course = await courseModel.find({coursename});

       if(course !=""){
            return res.status(201).send({
                message:"This course already exits",
                success:false
            })
       }
       const newCourse = new courseModel({
        coursename
       })

       await newCourse.save();

       return res.status(200).send({
        message:"Course successfully added",
        success:true
    })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}


exports.allCourse = async (req, res)=>{
    try {
       
       const Course = await courseModel.find();

       return res.status(200).send({
        message:"Got all course",
        success:true,
        Course:Course
    })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}


exports.deleteCourse = async (req, res)=>{
    try {
       
       const id = req.params.id;

       if(!id){
            return res.status(201).send({
                message:"No course exist",
                success:false
            })
       }

       await courseModel.findByIdAndDelete(id)

       return res.status(200).send({
        message:"Course deleted successfully",
        success:true
    })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}


exports.editCourse = async (req, res)=>{
    try {
       
       const id = req.params.id;

       if(!id){
        return res.status(201).send({
            message:"No data found",
            success:false
        })
       }

       const {coursename,status} = req.body;

       if(!coursename){
        const course = await courseModel.findById(id);
            return res.status(201).send({
                message:"Got the course data",
                success:false,
                course:course
            })
       }

       const oldCourse = await courseModel.find({coursename});
        if(oldCourse !=""){
                return res.status(201).send({
                    message:"This course already exist",
                    success:false
                })
        }

       const newCourse = {coursename,status};

       await courseModel.findByIdAndUpdate(id,newCourse)

       return res.status(200).send({
        message:"Course upated successfully",
        success:true,
        newCourse:newCourse
    });

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}