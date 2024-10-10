import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import Header from "../header/header";

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
      <h1>Dashboard</h1>
      <button onClick={handleSignOut}>Sign out</button>
      <div>
        <Link to={`/profile`}>Go to Profile</Link>
      </div>
    </div>
  );
}
