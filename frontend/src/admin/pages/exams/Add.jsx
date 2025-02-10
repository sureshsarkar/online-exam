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


  return (
    <div className="main">
      <div className="report-container-1">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-plus-lg"></i> Exam</h1>
          <a href="/exams">
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