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

       if(!studentid || !questionid || !selectedoption || !totaltime || !totalquestion || !correctanswer ){
            return res.status(201).send({
                message:"Select atleast one anwser",
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
        message:"Got all exam",
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
                message:"No exam exist",
                success:false
            })
       }

       await examModel.findByIdAndDelete(id)

       return res.status(200).send({
        message:"Exam deleted successfully",
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

       const {studentid,
        questionid,
        selectedoption, 
        totaltime,
        totalquestion,
        totalattempt,
        correctanswer,
        totalmarks,
        status} = req.body;
       
       if(!studentid || !questionid || !selectedoption || !totaltime || !totalquestion || !correctanswer || !totalattempt || !totalmarks ){
        const examData = await examModel.findById(id);
        return res.status(201).send({
            message:"Exam Data found",
            success:false,
            examData:examData
        })
   } 

       const newExam = {studentid,questionid,selectedoption,totaltime,totalquestion,totalattempt, correctanswer, totalmarks, status};

       await examModel.findByIdAndUpdate(id,newExam)

       return res.status(200).send({
        message:"Exam upated successfully",
        success:true
    });

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}