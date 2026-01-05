import { NavLink } from "react-router-dom";
import { FaGithub, FaInstagram } from "react-icons/fa";
import "../styles/sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <h2>CancerAI</h2>
        <p>Risk Assessment</p>
      </div>

      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/calculate">
          Calculation
        </NavLink>
        <NavLink to="/research">
          Biologic Research
        </NavLink>
        <NavLink to="/docs">
          AI Docs
        </NavLink>
      </nav>

      {/* footer */}
      <div className="sidebar-footer">
        <div className="socials">
          <a href="#" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>

        <small>v0.1</small>
      </div>
    </aside>
  );
}
