import { Link, useNavigate } from "react-router-dom";

import style from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { signOut } from "firebase/auth";
import { auth } from "../../Pages/Forma/FireBase/firebase.config";
import { logout } from "../../Redux/Slices/authSlice";

export const Header = () => {
  const user = useAppSelector(state => state.auth.user)

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpenLogin = () => {
    navigate("/auth");
  };


  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout())
    } catch (err: any) {
      console.error("Error signing out: ", err.message);
      
    }
  }

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
          <li>Films</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
      <div className={style.loginButtonContainer}>
        {!user ? <button className={style.loginButton} onClick={handleOpenLogin}> Log in </button> : <button className={style.loginButton} onClick={handleLogout}> Sign out </button>}
        
      </div>
    </header>
  );
};
