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
    const token = localStorage.getItem('TOKEN');
    if (token) {
      setJwtToken(token);
      const decodedToken = jwtDecode(token);
      setUser({ username: decodedToken.username });
    }
    console.log(token)

    setLoading(false)
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
        const decodedToken = jwtDecode(data.token);
        setUser({ username: data.username });
      });

      navigate('/')
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("TOKEN");
    navigate('/login')
  };



  return (
    <AuthContext.Provider value={{ user, login, logout, jwtToken, setJwtToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
