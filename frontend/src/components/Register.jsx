// src/components/Register.jsx
import { useState } from "react";
import Avatar from "./Avatar";
import AuthService from "../services/auth.service";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  // Validación en el front-end antes de enviar al back-end
  const validate = () => {
    const e = {};
    if (form.username.trim().length < 3 || form.username.trim().length > 20)
      e.username = "El usuario debe tener entre 3 y 20 caracteres.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Ingrese un correo electrónico válido.";
    if (form.password.length < 6 || form.password.length > 40)
      e.password = "La contraseña debe tener entre 6 y 40 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);
    if (!validate()) return;
    try {
      const response = await AuthService.register(form.username, form.email, form.password);
      setMessage(response.data.message);
      setSuccessful(true);
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  const field = (name, label, type = "text") => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input type={type} name={name} className={`form-control ${errors[name] ? "is-invalid" : ""}`}
        value={form[name]} onChange={handleChange} />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );

  return (
    <div className="card card-auth shadow-sm">
      <Avatar />
      <h4 className="text-center mb-3">Registrarse</h4>
      <form onSubmit={handleRegister} noValidate>
        {!successful && (
          <>
            {field("username", "Usuario")}
            {field("email", "Correo electrónico", "email")}
            {field("password", "Contraseña", "password")}
            <button className="btn btn-primary w-100">Registrarse</button>
          </>
        )}
        {message && (
          <div className={`alert mt-3 mb-0 ${successful ? "alert-success" : "alert-danger"}`}>{message}</div>
        )}
      </form>
    </div>
  );
};

export default Register;
