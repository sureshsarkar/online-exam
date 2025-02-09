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
        success:true,
        newQuestion:newQuestion
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
    //    const question =  await questionModel.find({});

        const question = await questionModel.aggregate([
            {
            $lookup: {
                from: "courses", // Collection name for courses
                localField: "courseid",
                foreignField: "_id",
                as: "courseDetails",
            },
            },
            {
            $lookup: {
                from: "subjects", // Collection name for subjects
                localField: "subjectid",
                foreignField: "_id",
                as: "subjectDetails",
            },
            },
            {
            $project: {
                _id: 1,
                questiontext: 1,
                option1: 1,
                option2: 1,
                option3: 1,
                option4: 1,
                correctoption: 1,
                status: 1,
                createdAt: 1,
                updatedAt: 1,
                courseDetails: { _id: 1, coursename: 1 }, // Select only needed fields from courses
                subjectDetails: { _id: 1, subjectname: 1 }, // Select only needed fields from subjects
            },
            },
        ]);

        return res.status(200).send({
        message:"Got all Questions",
        success:true,
        question:question
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
                message:"No question exist",
                success:false
            })
       }

       await questionModel.findByIdAndDelete(id);

       return res.status(200).send({
        message:"Question deleted successfully",
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
                success:true,
                question:question
            });
       };

       const oldQuestion = await questionModel.find({questiontext,_id:{$ne:id}});
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


exports.viewQuestion = async (req, res)=>{
    try {
       
       const id = req.params.id;

       if(!id){
        return res.status(201).send({
            message:"No data found",
            success:false
        })
       }
 

       const question = await questionModel.findById(id).populate('courseid subjectid').exec();;
        if(question){
                return res.status(201).send({
                    message:"Found the question data",
                    success:true,
                    question:question
                })
        }


    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}