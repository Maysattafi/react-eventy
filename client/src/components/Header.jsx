import { Link, NavLink } from "react-router";
import { useAuth } from "../context/AuthContext.jsx";

function Header() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="logo">
          <span className="logo-dot"></span>
          Eventy
        </Link>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end className="nav-link">Events</NavLink>
          </li>
          {user?.role === "admin" && (
            <li>
              <NavLink to="/admin/events/new" className="nav-link">Add event</NavLink>
            </li>
          )}
        </ul>

        <div className="nav-user">
          {user ? (
            <>
              <span className="nav-name">{user.name}</span>
              <button className="btn-nav" onClick={logout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/login" className="btn-nav">Log in</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;