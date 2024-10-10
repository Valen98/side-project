import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //THIS IS IF THE USER REFRESH THE WEBSITE
    const token = localStorage.getItem("TOKEN");
    if (token) {
      setJwtToken(token);
      getUser(token);
    }
    console.log(token);

    setLoading(false);
  }, []);

  const login = async (username, password) => {
    const signIn = {
      username: username,
      password: password,
    };

    await fetch("http://localhost:4000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signIn),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJwtToken(data.token);
        localStorage.setItem("TOKEN", data.token);
        setUser({id: data.id, username: data.username, email: data.email})
      });

    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("TOKEN");
    navigate("/login");
  };

  const getUser = async (token) => {
    const decodedToken = jwtDecode(token);
    await fetch(`http://localhost:4000/users/${decodedToken.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((resp) => {
        setUser(resp.data);
      });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, jwtToken, setJwtToken, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
