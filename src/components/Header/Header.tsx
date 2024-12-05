import { Link, useNavigate } from 'react-router-dom';

import style from "./Header.module.css";

export const Header = () => {

  const navigate = useNavigate();

  const handleOpenLogin = () => {
    navigate('/auth')
  }

  return (
    <header className={style.header}>

      <div className={style.headerCenter}>
          <ul className={style.navList}>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
          <div>
            <button onClick={handleOpenLogin}>Войти</button>
          </div>
      </div>
    </header>
  )
}
