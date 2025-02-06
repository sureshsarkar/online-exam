//Nav.js

import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from "react-router-dom";

const Nav = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handelLogout = async ()=>{
          const {data} = await axios.get("/api/user/logout");
          if(data?.success){
            toast.success(data.success);
            navigate('/login');
            }
    }

    return (
        <div className="navcontainer">
            <nav className="nav">
                <div className="nav-upper-options">
                <Link to="/dashboard" className={location.pathname === "/" ? "active" : ""}>
                        
                    <div className="nav-option ">
                        <i className="bi bi-laptop"></i>
                        <h3>Dashboard</h3>
                    </div>
                    </Link>
                    <Link to="/students" className={location.pathname === "/students" ? "active" : ""}>
                        <div className=" nav-option">
                            <i className="bi bi-people"></i>
                            <h3>Stutents</h3>
                        </div>
                    </Link>
                    <Link to="/subjects" className={location.pathname === "/subjects" ? "active" : ""}>
                        <div className=" nav-option">
                            <i className="bi bi-book"></i>
                            <h3>Subjects</h3>
                        </div>
                    </Link>
                    <Link to="/courses" className={location.pathname === "/courses" ? "active" : ""}>
                        <div className=" nav-option">
                            <i className="bi bi-bookshelf"></i>
                            <h3>Courses</h3>
                        </div>
                    </Link>
                    <Link to="/questions" className={location.pathname === "/questions" ? "active" : ""}>
                        <div className=" nav-option">
                        <i className="bi bi-journal-text"></i>
                            <h3>Questions</h3>
                        </div>
                    </Link>
                    <Link to="/exams" className={location.pathname === "/exams" ? "active" : ""}>
                        <div className=" nav-option">
                        <i className="bi bi-pc-display"></i>
                            <h3>Exams</h3>
                        </div>
                    </Link>


                    <div className="nav-option logout" onClick={handelLogout}>
                    <i className="bi bi-box-arrow-left"></i>
                        <h3>Logout</h3>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Nav;
