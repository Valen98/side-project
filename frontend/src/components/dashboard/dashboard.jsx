import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import Header from "../header/header";
import "./style.scss";

export default function Dashboard() {
  const { logout, user } = useAuth();
  const handleSignOut = () => {
    logout();
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="dashboardMainBody">
        <div className="welcomeMessageBody">
          <h1>Welcome {user.username}!</h1>
        </div>

      </div>
    </div>
  );
}
