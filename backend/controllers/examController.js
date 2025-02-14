const examModel = require("../models/examModel");
const { getIdFromToken } = require("../utils/generateToken");


exports.addExam = async (req, res)=>{
    try {


    const tokenData =  getIdFromToken(req,res);
    const studentid = tokenData.userId;

       const {
        // questionid,
        // selectedoption, 
        totaltime,
        totalquestion,
        totalattempt,
        correctanswer,
        totalmarks} = req.body;

       if(!studentid || !totaltime || !totalquestion ){
            return res.status(201).send({
                message:"Select atleast one anwser",
                success:false,
                kk:req.body
            })
       } 
    

       const newExam = new examModel({
        studentid,
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
       const tokenData =  getIdFromToken(req,res);
       return res.status(200).send({
        message:"Got all exam",
        success:true,
        exam:exam,
        tokenData:tokenData
    })
       const studentId = tokenData.userId;
        const role = tokenData.role;
     
        if(!role){
           const exam = await examModel.find({ studentid: studentId }).populate('studentid').exec();
               return res.status(200).send({
                    message:"Got all exam",
                    success:true,
                    exam:exam
                })
       }else{
           const exam = await examModel.find().populate('studentid').exec();
               return res.status(200).send({
                    message:"Got all exam",
                    success:true,
                    exam:exam
                })
       }



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

exports.viewExam = async(req,res)=>{
    try{
        const id = req.params.id;

        if(!id){
              return res.status(201).send({
               message:"No data found",
               success:false

            })
        }

        const exam = await examModel.findById(id).populate('studentid').exec();
        return res.status(200).send({
           message:"Got Data",
           success:true,
           exam:exam

        })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}