import { useContext, useState } from "react";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.scss";
import { UserContext } from "../../App";
import { useAuth } from "../../utils/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { jwtToken, setJwtToken } = useContext(UserContext);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(username, password)
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
