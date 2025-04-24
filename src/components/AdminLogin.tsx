import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        window.location.href = "/admin";
      }
    } catch (err) {
      console.log(err);
      setError("Invalid password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AdminLogin;
