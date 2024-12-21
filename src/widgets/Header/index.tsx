import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../shared/consts/firebase/firebase.config";
import { logout } from "../../redux/slices/authSlice";
import { useState } from "react";

import style from "./ui.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";

export const Header = () => {
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenLogin = () => {
    navigate("/Auth", { state: { from: location.pathname } });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (err: any) {
      console.error("Error signing out: ", err.message);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <header className={style.header}>
      <div className={style.logoContainer}>
        <Link to="/">
          <h1>Cinema</h1>
        </Link>
      </div>
      <nav
        className={`${style.navContainer} ${isMenuOpen ? style.navOpen : ""}`}
      >
        <ul className={style.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Films
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              About
            </a>
          </li>
          <li>
            <Link to="/Contacts">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className={style.actionsContainer}>
        <div className={style.loginButtonContainer}>
          {!user ? (
            <button
              className={style.loginButton}
              onClick={() => {
                handleOpenLogin();
              }}
            >
              Log in
            </button>
          ) : (
            <button className={style.loginButton} onClick={handleLogout}>
              Sign out
            </button>
          )}
        </div>
        <button
          className={`${style.burgerButton} ${isMenuOpen ? style.active : ""}`}
          onClick={toggleMenu}
        >
          <span className={style.bar}></span>
          <span className={style.bar}></span>
          <span className={style.bar}></span>
        </button>
      </div>
    </header>
  );
};
