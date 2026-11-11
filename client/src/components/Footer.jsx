import { Link } from "react-router";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="logo">
            <span className="logo-dot"></span>
            Eventy
          </span>
          <p>The official events platform of the institute.</p>
        </div>
        <div className="footer-links">
          <Link to="/">Events</Link>
          <Link to="/login">Log in</Link>
        </div>
        <p className="footer-copy">© 2026 Eventy. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;