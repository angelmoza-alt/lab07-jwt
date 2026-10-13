// src/components/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
import AuthService from "../services/auth.service";

const Login = ({ onLogin }) => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validación en el front-end antes de enviar al back-end
  const validate = () => {
    const e = {};
    if (!form.username.trim()) e.username = "El usuario es obligatorio.";
    if (!form.password) e.password = "La contraseña es obligatoria.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await AuthService.login(form.username, form.password);
      onLogin(user);
      navigate("/profile");
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-auth shadow-sm">
      <Avatar />
      <h4 className="text-center mb-3">Iniciar sesión</h4>
      <form onSubmit={handleLogin} noValidate>
        <div className="mb-3">
          <label className="form-label">Usuario</label>
          <input name="username" className={`form-control ${errors.username ? "is-invalid" : ""}`}
            value={form.username} onChange={handleChange} />
          <div className="invalid-feedback">{errors.username}</div>
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" name="password" className={`form-control ${errors.password ? "is-invalid" : ""}`}
            value={form.password} onChange={handleChange} />
          <div className="invalid-feedback">{errors.password}</div>
        </div>
        <button className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        {message && <div className="alert alert-danger mt-3 mb-0">{message}</div>}
      </form>
    </div>
  );
};

export default Login;
