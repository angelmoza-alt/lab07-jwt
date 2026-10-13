// src/components/Board.jsx
// Panel protegido: muestra el contenido devuelto por el back-end según el rol
import { useEffect, useState } from "react";

const Board = ({ title, fetch }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch()
      .then((res) => { setContent(res.data); setError(false); })
      .catch((err) => { setContent(err.response?.data?.message || err.message); setError(true); });
  }, [fetch]);

  return (
    <div className="p-5 bg-white rounded shadow-sm">
      <h3>{title}</h3>
      <p className={`lead mb-0 ${error ? "text-danger" : ""}`}>{content}</p>
    </div>
  );
};

export default Board;
