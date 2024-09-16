import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg";
import { FaCartArrowDown } from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img className="logo" src={logo} alt="Tasty Trails Logo" />
        </Link>
      </div>

      <div className="nav-items">
        <ul>
          <li><Link className="nav-links" to="/">Home</Link></li>
          <li><Link className="nav-links" to="/about">About</Link></li>
          <li><Link className="nav-links" to="/contact">Contact</Link></li>
          <li><Link className="nav-links"><FaCartArrowDown /></Link></li>
          <button
            className="login"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
