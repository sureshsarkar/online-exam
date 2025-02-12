import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => { 

  const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      email: inputs.email,
      password: inputs.password,
    };

    try {
      const endpoint =
        inputs.email === "admin@gmail.com"
          ? `${BACKEND_BASE_URL}/api/user/login`
          : `${BACKEND_BASE_URL}/api/student/login`;

      const { data } = await axios.post(endpoint, formData);

      if (data?.success) {
        toast.success(data.message);
        const tokenData = { token: data.token, role: data.role || "" };
        loginAction(tokenData);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="main">
      <div className="report-container-1">
        <div className="report-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
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
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <span> New User? <a href="/register">Sign Up</a></span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
