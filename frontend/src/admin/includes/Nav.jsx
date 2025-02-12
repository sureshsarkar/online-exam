import axios from 'axios';
import React,{useEffect} from 'react';
import toast from 'react-hot-toast';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../auth/AuthProvider';

const Nav = ({getRole,roleAuth}) => {
    const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL;
    const { logoutAction } = useAuth();
    const location = useLocation();
    const { token } = useAuth();
    const handleLogout = async () => {
        try {
            const { data } = await axios.get(`${BACKEND_BASE_URL}/api/user/logout`);

            if (data?.success) {
                toast.success(data.message);
                logoutAction();
            }
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };


  useEffect(() => {
        getRole();
    }, [roleAuth])


    return (
        <div className="navcontainer">
            <nav className="nav">
                <div className="nav-upper-options">
                {(token) &&
                    <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
                        <div className="nav-option">
                            <i className="bi bi-laptop"></i>
                            <h3>Dashboard</h3>
                        </div>
                    </Link>
                    }
                    {(token && roleAuth) &&
                    <Link to="/students" className={location.pathname === "/students" ? "active" : ""}>
                        <div className="nav-option">
                            <i className="bi bi-people"></i>
                            <h3>Students</h3>
                        </div>
                    </Link>
                    }
                    {(token && roleAuth) &&
                    <Link to="/subjects" className={location.pathname === "/subjects" ? "active" : ""}>
                        <div className="nav-option">
                            <i className="bi bi-book"></i>
                            <h3>Subjects</h3>
                        </div>
                    </Link>
                    }
                    {(token && roleAuth) &&
                    <Link to="/courses" className={location.pathname === "/courses" ? "active" : ""}>
                        <div className="nav-option">
                            <i className="bi bi-bookshelf"></i>
                            <h3>Courses</h3>
                        </div>
                    </Link>
                    }
                    {(token && roleAuth) &&
                    <Link to="/questions" className={location.pathname === "/questions" ? "active" : ""}>
                        <div className="nav-option">
                            <i className="bi bi-journal-text"></i>
                            <h3>Questions</h3>
                        </div>
                    </Link>
                    }
                    {(token && roleAuth) &&
                    <Link to="/exams" className={location.pathname === "/exams" ? "active" : ""}>
                        <div className="nav-option">
                            <i className="bi bi-pc-display"></i>
                            <h3>Exams</h3>
                        </div>
                    </Link>
                    }
                      {(token) &&
                    <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
                        <div className="nav-option">
                            <i className="bi bi-pc-display"></i>
                            <h3>Profile</h3>
                        </div>
                    </Link>
                    }

                    {token &&
                        <div className="nav-option logout" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-left"></i>
                            <h3>Logout</h3>
                        </div>}
                </div>
            </nav>
        </div>
    );
};

export default Nav;
