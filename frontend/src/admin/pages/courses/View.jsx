//Main.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const View = () => {
  const { id } = useParams();
  const [inputs ,setInputs] = useState({
    coursename:"", 
    status:""
  });

  useEffect(()=>{
    fetchStudent();
  }, [id]);


  const fetchStudent = async ()=>{
    try {
      const {data} = await axios.put(`/api/course/edit/${id}`);
      //  console.log(data);
       
      if(data?.success){
        setInputs({
          coursename: data.course.coursename,
          status: data.course.status
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
          <a href="/courses">
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
                  <th><i className="bi bi-person-check-fill text-info"></i> Course Name</th>
                  <td>{inputs.coursename}</td>
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