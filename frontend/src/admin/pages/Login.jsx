//Main.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const [inputs ,setInputs] = useState({
    email:"",
    password:""
  });


  const handleSubmit  = async (e)=>{
    e.preventDefault();
    const formData =  {
      email: inputs.email,
      password: inputs.password
    }
    
    try {
    const {data} = await axios.post("/api/user/login",formData);
    if (data?.success) {
      toast.success(data.message);
      
      navigate('/dashboard')
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
       

        <div className="report-body">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Email <span className="text-success"><b>*</b></span>
                </label>
                <input
                  type="text"
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
