//Main.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
const Add = () => {

  const navigate = useNavigate();
  const [inputs ,setInputs] = useState({
    name:"",
    email:"",
    mobile:"",
    password:"",
    gender:"",
  });


  const handleSubmit  = async (e)=>{
    e.preventDefault();
    const formData =  {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      mobile: inputs.mobile,  
      gender: inputs.gender,
      status: inputs.status,
    }
    try {
    const {data} = await axios.post("/api/student/add",formData);
    if (data?.success) {
      toast.success(data.message);
      
      navigate('/students')
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
  return (
    <div className="main">
      <div className="report-container-1">
        <div className="report-header">
          <h1 className="recent-Articles"><i className="bi bi-plus-lg"></i> Add Stutents</h1>
          <a href="/students">
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
                  name="name"
                  onChange={handleChange}
                  value={inputs.name}
                   placeholder="Ex. Suresh Sarkar"
                  required
                />
              </div>
            </div>
            
            
            <div className="col-md-6">
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
            </div>

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

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Gender <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select form-controle" name="gender" onChange={handleChange} required>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Status <span className="text-success"><b>*</b></span>
                </label>
                <select className="form-select form-controle" name="status" onChange={handleChange} required>
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

export default Add