import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
        window.location.href = "/admin"; // 예: 관리 페이지로 이동
      }
    } catch (err) {
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
}
