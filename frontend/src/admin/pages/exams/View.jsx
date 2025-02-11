//Main.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs ,setInputs] = useState({
    studentname:"", 
    totalmarks:"", 
    totalquestion:"", 
    createdat:"", 
    updatedat:"", 
    totaltime:"", 
    correctanswer:"",
    percentage:0,
    status:""
  });

  useEffect(()=>{
    fetchStudent();
  }, [id]);


  const fetchStudent = async ()=>{
    try {
      const {data} = await axios.get(`/api/exam/view/${id}`);
       console.log(data);
      if(data?.success){
        setInputs({
          studentname: data.exam.studentid.name,
          totalmarks: data.exam.totalmarks,
          totalquestion: data.exam.totalquestion,
          totaltime:data.exam.totaltime,
          correctanswer: data.exam.correctanswer,
          percentage:data.exam.totalmarks*100/data.exam.totalquestion,
          updatedat: data.exam.updatedAt,
          createdat: data.exam.createdAt,
          status: data.exam.totalmarks*100/data.exam.totalquestion >= 33.33 ? 'Pass' : 'Fail'
        });
      }
    } catch (error) {
      toast.error(error)
    }
  }
 


  return (
    <div className="main">
      <div className="report-container-1">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-plus-lg"></i> View Exam </h1>
          {/*<a href="/exams">*/}
          <button  onClick={() => navigate(-1)} className="btn-voilate"><i className="bi bi-arrow-left"></i> Back</button>
          {/*</a>*/}
        </div>

        <div className="report-body">
        <div className="row">
        {/* Task Information */}
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Student Name</th>
                  <td>{inputs.studentname}</td>
                </tr>

                 <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Total Marks</th>
                  <td>{inputs.totalmarks}</td>
                </tr>

                 <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Total Questions</th>
                  <td>{inputs.totalquestion}</td>
                </tr>

                 <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Total  Time</th>
                  <td>{inputs.totaltime/60} Minutes</td>
                </tr>

                


              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Task Information */}
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <tbody>
                <tr>
                  <th><i className="bi bi-chat-dots text-info"></i> Percentage</th>
                  <td>
                     <span className={`badge ${inputs.percentage >= 33 ? 'bg-success' : 'bg-danger'}`}>
                       {inputs.percentage.toFixed(2)} %
                     </span>
                  </td>
                </tr>
                <tr>
                  <th><i className="bi bi-chat-dots text-info"></i> Status</th>
                  <td>
                     <span className={`badge ${inputs.status === 'Pass' ? 'bg-success' : 'bg-danger'}`}>
                       {inputs.status}
                     </span>
                  </td>
                </tr>
                <tr>
                     <th><i className="bi bi-person-check-fill text-info"></i> Created At</th>
                     <td>{inputs.createdat}</td>
                </tr>

                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Updated At</th>
                  <td>{inputs.updatedat}</td>
                </tr>


               
              </tbody>
            </table>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default View