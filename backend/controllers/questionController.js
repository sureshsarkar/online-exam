const questionModel = require("../models/questionModel")


exports.addQuestion = async (req, res)=>{
    try {
       const {subjectid,courseid,questiontext,option1,option2,option3,option4,correctoption} = req.body;

       if(!subjectid || !courseid || !questiontext || !option1 || !option2 || !option3 || !option4 || !correctoption){
            return res.status(201).send({
                message:"Fill the field",
                success:false 
            })
       } 


       const question = await questionModel.find({questiontext});

       if(question !=""){
            return res.status(201).send({
                message:"This question already exits",
                success:false
            })
       }

       const newQuestion = new questionModel({
        subjectid,courseid,questiontext,option1,option2,option3,option4,correctoption
       })

       await newQuestion.save();

       return res.status(200).send({
        message:"Question successfully added",
        success:true
    })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}


exports.allQuestion = async (req, res)=>{
    try {
       const Course = await questionModel.find();
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


exports.deleteQuestion = async (req, res)=>{
    try {
       
       const id = req.params.id;

       if(!id){
            return res.status(201).send({
                message:"No course exist",
                success:false
            })
       }

       await questionModel.findByIdAndDelete(id)

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


exports.editQuestion = async (req, res)=>{
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
        const question = await questionModel.findById(id);
            return res.status(201).send({
                message:"Got the question data",
                success:false,
                question:question
            })
       }

       const oldQuestion = await questionModel.find({questiontext});
        if(oldQuestion !=""){
                return res.status(201).send({
                    message:"This question already exist",
                    success:false
                })
        }

       const newQuestion = {subjectid,courseid,questiontext,option1,option2,option3,option4,correctoption,status};

       await questionModel.findByIdAndUpdate(id,newQuestion)

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