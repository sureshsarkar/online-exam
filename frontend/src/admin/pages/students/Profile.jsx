//Main.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const Profile = () => {
  const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs ,setInputs] = useState({
    name:"",
    email:"",
    mobile:"",
    password:"",
    gender:"",
    status:"",
    role:""
  });

  useEffect(()=>{
    fetchStudent();
  }, [id]);


  const fetchStudent = async ()=>{
    try {
      const {data} = await axios.get(`${BACKEND_BASE_URL}/api/student/profile`);
       console.log(data);
       
      if(data?.success && data.student.role){
        setInputs({
          name: data.student.fullname,
          email: data.student.email,
          status: data.student.status,
           role: data.student.role
        });
      }else{
         setInputs({
          name: data.student.name,
          email: data.student.email,
          mobile: data.student.mobile,
          gender: data.student.gender,
          status: data.student.status
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
          <h1 className="recent-Articles"><i className="bi bi-person-badge"></i> Profile</h1>
          {/*<a href="/students">*/}
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
                  <th><i className="bi bi-person-check-fill text-info"></i> Name</th>
                  <td>{inputs.name}</td>
                </tr>
                <tr>
                  <th><i className="bi bi-router text-info"></i> Email</th>
                  <td>{inputs.email}</td>
                </tr>
                {inputs.role ?(
                <tr>
                  <th><i className="bi bi-router text-info"></i> Role</th>
                  <td className={inputs.role === 1 ? "text-success" : "text-danger"}>{inputs.role === 1 ? "Admin" : "Sub Admin"}</td>
                </tr>
              
              ):(
                  <tr>
                  <th><i className="bi bi-router text-info"></i> Gender</th>
                  <td>{inputs.gender}</td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Task Information */}
        <div className="col-md-6">
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <tbody>
              {inputs.mobile ?(
                <tr>
                  <th><i className="bi bi-usb-symbol text-info"></i> Mobile</th>
                  <td>{inputs.mobile}</td>
                </tr> 
              ):('')}
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

export default Profile