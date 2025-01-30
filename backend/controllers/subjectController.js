const subjectModel = require("../models/subjectModel")


exports.addSubject = async (req, res)=>{
    try {
       const {subjectname} = req.body;
       if(!subjectname){
            return res.status(201).send({
                message:"Fill the field",
                success:false 
            })
       } 

       const subject = await subjectModel.find({subjectname});

       if(subject !=""){
            return res.status(201).send({
                message:"This Subject already exits",
                success:false
            })
       }
       const newSubject = new subjectModel({
        subjectname
       })

       await newSubject.save();

       return res.status(200).send({
        message:"Subject successfully added",
        success:true
    })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}


exports.allSubject = async (req, res)=>{
    try {
       
       const subjects = await subjectModel.find();

       return res.status(200).send({
        message:"Got all subject",
        success:true,
        subjects:subjects
    })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}


exports.deleteSubject = async (req, res)=>{
    try {
       
       const id = req.params.id;

       if(!id){
            return res.status(201).send({
                message:"No subject exist",
                success:false
            })
       }

       await subjectModel.findByIdAndDelete(id)

       return res.status(200).send({
        message:"Subject deleted successfully",
        success:true
    })

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}


exports.editSubject = async (req, res)=>{
    try {
       
       const id = req.params.id;

       if(!id){
        return res.status(201).send({
            message:"No data found",
            success:false
        })
       }

       const {subjectname,status} = req.body;

       if(!subjectname){
        const subject = await subjectModel.findById(id);
            return res.status(201).send({
                message:"Got the subject data",
                success:false,
                subject:subject
            })
       }

       const oldsubject = await subjectModel.find({subjectname});
        if(oldsubject !=""){
                return res.status(201).send({
                    message:"This subject already exist",
                    success:false
                })
        }

       const newSubject = {subjectname,status};

       await subjectModel.findByIdAndUpdate(id,newSubject)

       return res.status(200).send({
        message:"Subject upated successfully",
        success:true,
        newSubject:newSubject
    });

    } catch (error) {
        return res.status(201).send({
            message:error.message,
            success:false 
        })
    }
}