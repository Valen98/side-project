import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoutes = () => {
  const { jwtToken, loading, user } = useAuth();

  if(loading) {
    return <div>Loading...</div>
  }

  // Ensure the token is present, otherwise navigate to login
  return jwtToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
