// src/components/Home.jsx
import { useEffect, useState } from "react";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent()
      .then((res) => setContent(res.data))
      .catch((err) => setContent(err.response?.data?.message || err.message));
  }, []);

  return (
    <div className="p-5 bg-white rounded shadow-sm">
      <h3>Inicio</h3>
      <p className="lead mb-0">{content}</p>
    </div>
  );
};

export default Home;
