import { Link } from "react-router-dom";
import "./style.scss"
import { Button } from "@mui/material";
export default function Header() {
  return (
    <div className="headerBody">
      <div className="logo"></div>
      <div className="navs">
        <ul className="navUL">
          <li className="navItem">
            <Link to={"/"} className="navItem">Home</Link>
          </li>
          <li className="navItem">
            <Link to={"/profile"} className="navItem">Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
