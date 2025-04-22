import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", { password });
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
        router.push("/admin"); // 관리자 페이지로 이동
      }
    } catch (err) {
      console.log(err);
      setError("Invalid password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 rounded border bg-white"
      >
        <h2 className="text-xl font-bold">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
}
