import { useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.scss";
import { UserContext } from "../../App";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {jwtToken, setJwtToken} = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);

    let signIn = {
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
        setJwtToken(data.token)
        localStorage.setItem('TOKEN', data.token)
        console.log(localStorage.getItem('TOKEN'))
      });
  };

  return (
    <section className="main-section">
      <div className="login-box">
        <div className="header">
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-box">
            <TextField
              className="input"
              id="username"
              label="Username"
              variant="standard"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-box">
            <TextField
              className="input"
              id="password"
              type="password"
              label="Password"
              variant="standard"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button variant="contained" onClick={handleSubmit}>
            Login
          </Button>
          <Link to={"/signup"} className="signup">
            New User?
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Login;
