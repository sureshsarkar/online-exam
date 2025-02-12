//Main.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const View = () => {
  const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
  const { id } = useParams();
  const [inputs ,setInputs] = useState({
    subjectname:"", 
    status:""
  });

  useEffect(()=>{
    fetchStudent();
  }, [id]);


  const fetchStudent = async ()=>{
    try {
      const {data} = await axios.put(`${BACKEND_BASE_URL}/api/subject/edit/${id}`);
       
      if(data?.success){
        setInputs({
          subjectname: data.subject.subjectname,
          status: data.subject.status
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
          <a href="/subjects">
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
                  <th><i className="bi bi-person-check-fill text-info"></i> Subject Name</th>
                  <td>{inputs.subjectname}</td>
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
                  <th><i className="bi bi-chat-dots text-info"></i> Status</th>
                  <td className={inputs.status === 1 ? "text-success" : "text-danger"}>{inputs.status === 1 ? "Active" : "Inactive"}</td>

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