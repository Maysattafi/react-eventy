import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const justRegistered = location.state?.registered;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message);
        return;
      }
      setUser(data);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Sorry, something went wrong.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <Link to="/" className="auth-logo">Eventy</Link>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to your university space</p>

        {justRegistered && (
          <div className="alert alert-success">
            <span className="alert-dot"></span>
            Registration successful! You can now log in.
          </div>
        )}
        {error && (
          <div className="alert alert-error">
            <span className="alert-dot"></span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field-group">
            <label className="field-label" htmlFor="email">University email</label>
            <input
              className="field-input"
              type="email"
              id="email"
              placeholder="you@univ.tn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field-group">
            <label className="field-label" htmlFor="password">Password</label>
            <input
              className="field-input"
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn-submit" type="submit">Log in</button>
        </form>

        <p className="auth-footer">
          No account yet? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;