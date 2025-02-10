import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  const loginAction = (tokenData) => {
    setToken(tokenData.token);
    localStorage.setItem("token", tokenData.token);
    localStorage.setItem("role", tokenData.role);
    navigate("/dashboard");
  };

  const logoutAction = () => {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };


  return (
    <AuthContext.Provider value={{ token, loginAction, logoutAction }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);