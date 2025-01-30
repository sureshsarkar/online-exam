const examModel = require("../models/examModel")


exports.addExam = async (req, res)=>{
    try {
       const {studentid,
        questionid,
        selectedoption, 
        totaltime,
        totalquestion,
        totalattempt,
        correctanswer,
        totalmarks} = req.body;

       if(studentid || !questionid || !selectedoption || !totaltime || !totalquestion || !correctanswer ){
            return res.status(201).send({
                message:"Select atleast one question",
                success:false 
            })
       } 
    

       const newExam = new examModel({
        studentid,
        questionid,
        selectedoption, 
        totaltime,
        totalquestion,
        totalattempt,
        correctanswer,
        totalmarks
       });



       await newExam.save();

       return res.status(200).send({
        message:"Exam submited",
        success:true
    })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}


exports.allExam = async (req, res)=>{
    try {
       const Course = await examModel.find();
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


exports.deleteExam = async (req, res)=>{
    try {
       
       const id = req.params.id;

       if(!id){
            return res.status(201).send({
                message:"No course exist",
                success:false
            })
       }

       await examModel.findByIdAndDelete(id)

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


exports.editExam = async (req, res)=>{
    try {
       
       const id = req.params.id;

       if(!id){
        return res.status(201).send({
            message:"No data found",
            success:false
        })
       }

       const {subjectid,courseid,questiontext,option1,option2,option3,option4,correctoption,status} = req.body;

       if(!subjectid || !courseid || !questiontext || !option1 || !option2 || !option3 || !option4 || !correctoption || !status){
        const question = await examModel.findById(id);
            return res.status(201).send({
                message:"Got the question data",
                success:false,
                question:question
            })
       }

       const oldQuestion = await examModel.find({questiontext});
        if(oldQuestion !=""){
                return res.status(201).send({
                    message:"This question already exist",
                    success:false
                })
        }

       const newQuestion = {subjectid,courseid,questiontext,option1,option2,option3,option4,correctoption,status};

       await examModel.findByIdAndUpdate(id,newQuestion)

       return res.status(200).send({
        message:"Question upated successfully",
        success:true
    });

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}