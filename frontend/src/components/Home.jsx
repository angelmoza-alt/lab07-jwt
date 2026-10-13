// src/components/Home.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const features = [
  {
    title: "Autenticación con JWT",
    text: "Al iniciar sesión el servidor entrega un token firmado que protege cada petición.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3Zm-1 14-4-4 1.4-1.4L11 13.2l4.6-4.6L17 10l-6 6Z" />
    ),
  },
  {
    title: "Acceso por roles",
    text: "Usuario, moderador y administrador ven opciones distintas en la aplicación.",
    icon: (
      <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3Zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3Zm0 2c-2.3 0-7 1.2-7 3.5V19h14v-2.5C15 14.2 10.3 13 8 13Zm8 0c-.3 0-.6 0-1 .1 1.2.8 2 1.9 2 3.4V19h6v-2.5c0-2.3-4.7-3.5-7-3.5Z" />
    ),
  },
  {
    title: "Contraseñas seguras",
    text: "Las contraseñas se guardan encriptadas con bcryptjs, nunca en texto plano.",
    icon: (
      <path d="M18 8h-1V6c0-2.8-2.2-5-5-5S7 3.2 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2Zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2Zm3.1-9H8.9V6c0-1.7 1.4-3.1 3.1-3.1s3.1 1.4 3.1 3.1v2Z" />
    ),
  },
];

const Home = () => {
  const [content, setContent] = useState("");
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    UserService.getPublicContent()
      .then((res) => setContent(res.data))
      .catch((err) => setContent(err.response?.data?.message || err.message));
  }, []);

  return (
    <div>
      {/* Portada */}
      <section className="hero rounded-4 p-4 p-md-5 mb-4 text-white">
        <div className="row align-items-center g-4">
          <div className="col-md-7">
            <span className="badge bg-light text-primary mb-3">Tecsup · Desarrollo de Aplicaciones Web Avanzado</span>
            <h1 className="display-5 fw-bold">Seguridad en aplicaciones con JWT</h1>
            <p className="lead mb-4">
              Aplicación full stack con Node.js, Express, Sequelize y React. Regístrate, inicia sesión y
              accede a los paneles según tu rol.
            </p>
            {currentUser ? (
              <Link to="/profile" className="btn btn-light btn-lg">Ver mi perfil</Link>
            ) : (
              <div className="d-flex gap-2 flex-wrap">
                <Link to="/login" className="btn btn-light btn-lg">Iniciar sesión</Link>
                <Link to="/register" className="btn btn-outline-light btn-lg">Registrarse</Link>
              </div>
            )}
          </div>
          <div className="col-md-5 text-center">
            {/* Ilustración: escudo con candado */}
            <svg viewBox="0 0 200 200" width="220" height="220" aria-hidden="true">
              <circle cx="100" cy="100" r="92" fill="rgba(255,255,255,.12)" />
              <path d="M100 30 45 52v40c0 37 23 66 55 78 32-12 55-41 55-78V52l-55-22Z" fill="#fff" />
              <rect x="74" y="92" width="52" height="40" rx="7" fill="#0d6efd" />
              <path d="M84 92V80a16 16 0 0 1 32 0v12" fill="none" stroke="#0d6efd" strokeWidth="8" />
              <circle cx="100" cy="110" r="6" fill="#fff" />
              <rect x="97" y="112" width="6" height="12" rx="2" fill="#fff" />
            </svg>
          </div>
        </div>
      </section>

      {/* Características */}
      <div className="row g-3 mb-4">
        {features.map((f) => (
          <div className="col-md-4" key={f.title}>
            <div className="card h-100 border-0 shadow-sm p-3">
              <svg viewBox="0 0 24 24" width="36" height="36" fill="#0d6efd" className="mb-2">{f.icon}</svg>
              <h5 className="fw-semibold">{f.title}</h5>
              <p className="text-muted mb-0">{f.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Respuesta pública del back-end */}
      <div className="alert alert-primary mb-0">
        <strong>Respuesta del servidor (/api/test/all):</strong> {content}
      </div>
    </div>
  );
};

export default Home;
