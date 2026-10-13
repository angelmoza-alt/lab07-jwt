// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Board from "./components/Board";
import UserService from "./services/user.service";

function App() {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const navigate = useNavigate();

  // La barra de navegación cambia según los roles del usuario
  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
    } else {
      setShowModeratorBoard(false);
      setShowAdminBoard(false);
    }
  }, [currentUser]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-3">
        <Link to="/" className="navbar-brand">Tecsup JWT</Link>
        <div className="navbar-nav me-auto">
          <Link to="/home" className="nav-link">Inicio</Link>
          {showModeratorBoard && <Link to="/mod" className="nav-link">Moderador</Link>}
          {showAdminBoard && <Link to="/admin" className="nav-link">Administrador</Link>}
          {currentUser && <Link to="/user" className="nav-link">Usuario</Link>}
        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <Link to="/profile" className="nav-link">{currentUser.username}</Link>
            <a href="/login" className="nav-link" onClick={(e) => { e.preventDefault(); logOut(); }}>
              Cerrar sesión
            </a>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <Link to="/login" className="nav-link">Iniciar sesión</Link>
            <Link to="/register" className="nav-link">Registrarse</Link>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login onLogin={setCurrentUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<Board title="Panel de Usuario" fetch={UserService.getUserBoard} />} />
          <Route path="/mod" element={<Board title="Panel de Moderador" fetch={UserService.getModeratorBoard} />} />
          <Route path="/admin" element={<Board title="Panel de Administrador" fetch={UserService.getAdminBoard} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
