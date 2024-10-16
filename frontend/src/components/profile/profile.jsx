import { useEffect, useState } from "react";
import { decodeToken } from "../../utils/JwtToken";
import { useAuth } from "../../utils/AuthContext";
import Header from "../header/header";
import Loading from "../loading/loading";

export default function ProfilePage() {
  const { logout, user } = useAuth();
  const handleSignOut = () => {
    logout();
  };
  
  if (!user) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <h1>Profile Page!</h1>
      {user.id}
      <h1>{user.username}</h1>
      {user.email}
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
}
