//Main.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import MCQExam from '../MCQExam';
const Add = () => {

  const navigate = useNavigate();
  const [inputs ,setInputs] = useState({
    coursename:"",
    status:1
  });


  // const handleSubmit  = async (e)=>{
  //   e.preventDefault();
  //   const formData =  {
  //     coursename: inputs.coursename,
  //     status: inputs.status,
  //   }
    
  //   try {
  //   const {data} = await axios.post("/api/course/add",formData);
  //   if (data?.success) {
  //     toast.success(data.message);
      
  //     navigate('/courses')
  //   }else{
  //     toast.error(data.message);
  //   }
  // } catch (error) {
  //   toast.success(error);
  // }
  // }
  // const handleChange = (e)=>{
  //      setInputs({
  //       ...inputs,
  //       [e.target.name]:e.target.value
  //      })
  // }
  return (
    <div className="main">
      <div className="report-container-1">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-plus-lg"></i> Exam</h1>
          <a href="/subjects">
          <button className="btn-voilate"><i className="bi bi-arrow-left"></i> Back</button>
          </a>
        </div>

        <div className="report-body">
      
           <MCQExam/>
        
        </div>
      </div>
    </div>
  );
};

export default Add