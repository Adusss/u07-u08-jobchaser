import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import "../../css/Header.css";
import { useTheme } from "../../ThemeContext";

export default function Header() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const { theme, toggleTheme } = useTheme();

  return (
    <header>
      <nav className="nav">
        <div className="nav-left">
          {!isAuthenticated && <Link to="/signin">Sign In</Link>}
          {isAuthenticated && (
            <Link className="jobs" to="/jobs">
              Jobs
            </Link>
          )}
          {isAuthenticated && (
            <Link className="addjob" to="/add-job">
              Add Job
            </Link>
          )}
        </div>

        <div className="nav-right">
          {!isAuthenticated && <Link to="/signup">Sign Up</Link>}

          {isAuthenticated && <button onClick={logout}>Logout</button>}
          <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
        </div>
      </nav>
    </header>
  );
}
