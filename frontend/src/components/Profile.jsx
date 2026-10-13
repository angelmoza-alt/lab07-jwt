// src/components/Profile.jsx
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3>Perfil de <strong>{currentUser.username}</strong></h3>
      <p><strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substring(currentUser.accessToken.length - 20)}</p>
      <p><strong>Id:</strong> {currentUser.id}</p>
      <p><strong>Correo:</strong> {currentUser.email}</p>
      <strong>Roles:</strong>
      <ul className="mb-0">
        {currentUser.roles.map((role) => <li key={role}>{role}</li>)}
      </ul>
    </div>
  );
};

export default Profile;
