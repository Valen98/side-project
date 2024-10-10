import { useEffect, useState } from "react";
import "./App.css";
import Signup from "./components/signup/signup";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { createContext } from "react";
import Login from "./components/login/login";
import { jwtDecode } from "jwt-decode";
import Dashboard from "./components/dashboard/dashboard";
const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("TOKEN");
    if (token != null) {
      let decodedToken = jwtDecode(token);
      let currentDate = new Date();

      if (decodedToken.exp * 1000 < currentDate.getTime) {
        console.log("Token Expired");
      } else {
        console.log("Valid Token");
        setLoggedIn(true);

      }
    } else {
      setLoggedIn(false);
    }
  }, []);

  return (
    <div>
      <UserContext.Provider
        value={{
          user: user,
          setUser: setUser,
          jwtToken: jwtToken,
          setJwtToken: setJwtToken,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              loggedIn ? <Dashboard /> : <Navigate replace to={"/login"} />
            }
          />
          <Route
            //change to /login
            path="/login"
            element={<Login />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export { App, UserContext };
