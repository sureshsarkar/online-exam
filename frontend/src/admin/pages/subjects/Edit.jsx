//Main.js

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs ,setInputs] = useState({
    subjectname:"", 
    status:""
  });




  const fetchSubject = async ()=>{
    try {
      const {data} = await axios.put(`/api/subject/edit/${id}`);
       
      if(data?.success){
        setInputs({
          subjectname: data.subject.subjectname,
          status: data.subject.status,
        });
      }
    } catch (error) {
      toast.error(error)
    }
  }

  const handleSubmit  = async (e)=>{
    e.preventDefault();
    const formData =  {
      subjectname: inputs.subjectname,
      status: inputs.status
    }
    try {
    const {data} = await axios.put(`/api/subject/edit/${id}`,formData);
    
    if (data?.success) {
      toast.success(data.message);
      
      navigate('/subjects')
    }else{
      toast.error(data.message);
    }
  } catch (error) {
    toast.success(error);
  }
  }
  const handleChange = (e)=>{
    setInputs({
     ...inputs,
     [e.target.name]:e.target.value
    })
}

useEffect(()=>{
  fetchSubject();
}, [id]);


  return (
    <div className="main">
      <div className="report-container-1">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-plus-lg"></i> Edit Subject</h1>
          <a href="/subjects">
          <button className="btn-voilate"><i className="bi bi-arrow-left"></i> Back</button>
          </a>
        </div>

        <div className="report-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Name <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="subjectname"
                  onChange={handleChange}
                  value={inputs.subjectname}
                   placeholder="Ex. Physics"
                  required
                />
              </div>
            </div>
            
            
            {/* <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="mobile" className="form-label">
                  Mobile <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="mobile"
                  onChange={handleChange}
                  value={inputs.mobile}
                  placeholder="Ex. 8789567788"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={handleChange}
                  value={inputs.email}
                  placeholder="Ex. abc@gmail.com"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="password"
                  className="form-control"
                  onChange={handleChange}
                  name="password"
                  value={inputs.password}
                  placeholder="Password"
                  required
                />
              </div>
            </div> */}

            {/* <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Role <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select" name="role" required onChange={handleChange}>
                  <option value="1">Employee</option>
                  <option value="2">Project Manager</option>
                  <option value="3">SEO Manager</option>
                  <option value="4">Development Manager</option>
                </select>
              </div>
            </div> */}

            {/* <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Gender <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select form-controle" name="gender" onChange={handleChange} value={inputs.gender}  required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div> */}

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Status <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select form-controle" name="status" onChange={handleChange} value={inputs.status}  required>
                  <option value="1">Active</option>
                  <option value="2">InActive</option>
                </select>
              </div>
            </div>

          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Edit