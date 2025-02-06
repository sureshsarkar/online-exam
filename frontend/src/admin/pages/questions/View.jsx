//Main.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const View = () => {
  const { id } = useParams();
  const [inputs ,setInputs] = useState({
    questiontext:"", 
    subjectid:"", 
    courseid:"", 
    option1:"", 
    option2:"", 
    option3:"", 
    option4:"", 
    correctoption:"", 
    createdAt:"", 
    updatedAt:"", 
    status:""
  });

  useEffect(()=>{
    fetchQuestion();
  }, [id]);


  const fetchQuestion = async ()=>{
    try {
      const {data} = await axios.put(`/api/question/view/${id}`);
       console.log(data);
       
      if(data?.success){
        setInputs({
          questiontext:data.question.questiontext,
          courseid: data.question.courseid.coursename,
          subjectid: data.question.subjectid.subjectname,
          option1:data.question.option1,
          option2:data.question.option2,
          option3:data.question.option3,
          option4:data.question.option4,
          correctoption:data.question.correctoption,
          createdAt:data.question.createdAt,
          updatedAt:data.question.updatedAt,
          status: data.question.status
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
          <h1 className="recent-Articles"><i className="bi bi-plus-lg"></i> View Subject </h1>
          <a href="/questions">
          <button className="btn-voilate"><i className="bi bi-arrow-left"></i> Back</button>
          </a>
        </div>

        <div className="report-body">
        <div className="row">
        {/* Task Information */}
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <tbody>
              <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Question Text</th>
                  <td>{inputs.questiontext}</td>
                </tr>
 

                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Option 1</th>
                  <td>{inputs.option1}</td>
                </tr>

                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Option 2</th>
                  <td>{inputs.option2}</td>
                </tr>

                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Option 3</th>
                  <td>{inputs.option3}</td>
                </tr>

                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Option 4</th>
                  <td>{inputs.option4}</td>
                </tr>

                <tr>
                  <th><i className="bi bi-chat-dots text-info"></i> Status</th>
                  <td className={inputs.status === 1 ? "text-success" : "text-danger"}>{inputs.status === 1 ? "Active" : "Inactive"}</td>
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
                  <th><i className="bi bi-person-check-fill text-info"></i> Course Name</th>
                  <td>{inputs.courseid}</td>
                </tr>

                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Subject Name</th>
                  <td>{inputs.subjectid}</td>
                </tr>
              <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Correct Option</th>
                  <td>{inputs.correctoption}</td>
                </tr>

                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Created At </th>
                  <td>{inputs.createdAt}</td>
                </tr>

                <tr>
                  <th><i className="bi bi-person-check-fill text-info"></i> Updated At</th>
                  <td>{inputs.updatedAt}</td>
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