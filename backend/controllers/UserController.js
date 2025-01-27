const express = require('express');
const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const {generateTokenAndSetCookie} = require('../utils/generateToken')
exports.getUsers = async (req, res)=>{
    try {
        const users = await userModel.find().select("-password");
        return res.status(200).send({
            message:"TO GO",
            success:true,
            users:users
        })
    } catch (error) {
        return res.status(500).send({
            message:error.message,
            success:false
        })
        
    }
}

exports.addUser = async (req,res)=>{
    try {
        const {fullname,email,password,role} = req.body;

        const userData = await userModel.findOne({email});

        if(userData){
            return res.status(201).send({
                message:"User exist",
                success:true,
                userData:userData
            }) 
        }
        
        const hashPassword =  await bcrypt.hash(password, 10);
        const newUser = new userModel({
            fullname,email,password:hashPassword,role
        })
       const users =  await newUser.save();

       return res.status(500).send({
        message:"User Added",
        success:true,
        users:users
    }) 

    } catch (error) {
        return res.status(500).send({
            message:error.message,
            success:false
        }) 
    }
}


exports.loginUser = async (req,res)=>{
    try {
        const {email,password} = req.body;

            // validation 
            if (!email || !password) {
                return res.status(201).send({
                    message: 'Please fill all fields',
                    success: false
                });
            }
        const user = await userModel.findOne({ email, status: 1  });
        if (!user) {
            return res.status(201).send({
                message: 'Unauthorized Login',
                success: false
            });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send({
                message: 'Email or password is incorrect',
                success: false
            });
        }
         
         // Generate token and set cookie
       const token =  generateTokenAndSetCookie(user._id,user.role, res);
 
       return res.status(200).send({
            message: 'User found and logged in successfully',
            success: true,
            token: token,
            role:user.role
       });

    }catch (error) {
        return res.status(500).send({
            message:error.message,
            success:false
        })
    }
}
