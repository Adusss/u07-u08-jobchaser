import { useState } from "react";
import { useAuthStore } from "../../store/authStore";
import "../../css/Signin.css";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();

      login(data.user, data.token);

      setMessage("Sign In!");
      navigate("/jobs");
    } else {
      setMessage("wrong email or password");
    }
  };

  return (
    <form className="signin-form" onSubmit={handleSubmit}>
      <h2>Login</h2>

      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />

      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />

      <button type="submit">Sign In</button>

      <p>{message}</p>
    </form>
  );
}
