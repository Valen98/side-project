import { useState } from "react";
import "./App.css";
import Signup from "./components/signup/signup";
import {  Route,  Routes,  } from "react-router-dom";
import { createContext } from "react";
import Login from "./components/login/login";
import Dashboard from "./components/dashboard/dashboard";
import ProfilePage  from "./components/profile/profile";
import PrivateRoutes from "./utils/PrivateRoutes";
import Header from "./components/header/header";
const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);

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
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" />
            <Route element={<ProfilePage />} path="/profile"/>
          </Route>
          <Route element={<Login />} path="/login" />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export { App, UserContext };

/* 
            <Route
              //change to /login
              path="/login"
              element={<Login />}
            />
            <Route path="/signup" element={<Signup />} />

*/
