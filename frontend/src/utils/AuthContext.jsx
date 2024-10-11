import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const base_URL = process.env.API_URL;

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

    await fetch(`${base_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signIn),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "error") {
          alert(data.data.message);
        } else {
          console.log(data);
          setJwtToken(data.token);
          localStorage.setItem("TOKEN", data.token);
          setUser({ id: data.id, username: data.username, email: data.email });
        }
      });

    navigate("/");
  };

  const signup = async (user) => {
    await fetch(`${base_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status != "error") {
          navigate("/login");
        } else {
          console.log(data);
          alert(data.data.message);
        }
      });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("TOKEN");
    navigate("/login");
  };

  const getUser = async (token) => {
    const decodedToken = jwtDecode(token);
    await fetch(`${base_URL}/users/${decodedToken.user.id}`, {
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
      value={{ user, login, logout, jwtToken, setJwtToken, loading, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
