import { Link, useNavigate } from "react-router-dom";

import style from "./Header.module.css";

import logo from "../../assets/Header/Logo.png";

export const Header = () => {
  const navigate = useNavigate();

  const handleOpenLogin = () => {
    navigate("/auth");
  };

  return (
    <header className={style.header}>
      <div className={style.logoContainer}>
        <h1>Cinema</h1>
      </div>
      <nav className={style.navContainer}>
        <ul className={style.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className={style.loginButtonContainer}>
        <button className={style.loginButton} onClick={handleOpenLogin}>
          Log in
        </button>
      </div>
    </header>
  );
};
