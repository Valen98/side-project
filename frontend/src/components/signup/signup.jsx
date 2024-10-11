import React from "react";
import { useState } from "react";
import "./style.scss";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordController, setPasswordController] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password != passwordController) {
      alert("Bad password or password not matching");
      return;
    }
    const newUser = {
      username: username,
      email: email,
      password: password
    }

    signup(newUser);

  };

  return (
    <section className="main-section">
      <div className="sign-in-box">
        <div className="header">
          <h1>Create an account!</h1>
        </div>
        <div>
          {error}
        </div>
        <form onSubmit={handleSubmit} className="sign-in-form">
          <div className="input-box">
            <TextField
              id="username"
              label="Username"
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <TextField
              id="email"
              label="Email"
              variant="standard"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-box">
            <TextField
              id="password"
              type="password"
              label="Password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-box">
            <TextField
              id="passwordController"
              type="password"
              label="Rewrite Password"
              variant="standard"
              onChange={(e) => setPasswordController(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Register
          </Button>
          <Link
            to={"/"}
            className="login"
            onClick={() => {
              console.log("CLICK");
            }}
          >
            New User?
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Signup;
