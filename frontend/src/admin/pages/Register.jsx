import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [inputs ,setInputs] = useState({
    name:"",
    email:"",
    mobile:"",
    password:"",
    gender:"Male",
    status:1
  });

  const { loginAction } = useAuth();
  
  const handleSubmit  = async (e)=>{
    e.preventDefault();
    const formData =  {
        name:inputs.name,
        email:inputs.email,
        mobile:inputs.mobile,
        password:inputs.password,
        gender:inputs.gender,
        status:inputs.status
    }


    try {
       
        const {data} = await axios.post("/api/student/add",formData);
 //            console.log(data);
 // return false
        if (data?.success) {

          toast.success(data.message);
          const tokenData = {token:data.token,role:""};
          loginAction(tokenData);
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

          <div className="col-md-4">
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
                 placeholder="Ex. Abc"
                required
              />
            </div>
          </div>

          <div className="col-md-4">
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


          <div className="col-md-4">
            <div className="mb-3">
              <label htmlFor="fullname" className="form-label">
                Mobile <span className="text-success"><b>*</b></span>
              </label>
              <input
                type="number"
                className="form-control"
                name="mobile"
                onChange={handleChange}
                value={inputs.mobile}
                 placeholder="Ex. 9876567654"
                required
              />
            </div>
          </div>

          <div className="col-md-4">
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


           <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Gender
                </label>
                <select className="form-select form-controle" name="gender" onChange={handleChange} value={inputs.gender}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>


             <div className="col-md-4">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Status
                </label>
                <select className="form-select form-controle" name="status" onChange={handleChange} value={inputs.status}>
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
          Sign Up
        </button> <span> Already have account <a href="/login">Login </a></span>
      </form>
      </div>
    </div>
  </div>
  );
};

export default Register;