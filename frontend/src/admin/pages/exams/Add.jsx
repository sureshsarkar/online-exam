//Main.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MCQExam from '../MCQExam';
const Add = () => {

  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="report-container-1">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-plus-lg"></i> Exam</h1>
          {/*<a href="/exams">*/}
          <button onClick={() => navigate(-1)} className="btn-voilate"><i className="bi bi-arrow-left"></i> Back</button>
          {/*</a>*/}
        </div>

        <div className="report-body">
      
           <MCQExam/>
        
        </div>
      </div>
    </div>
  );
};

export default Add