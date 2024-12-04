import React from 'react'
import { Link } from 'react-router-dom';

import style from "./Header.module.css";

export const Header = () => {
  return (
    <header className={style.header}>

      <div className={style.headerCenter}>
        <nav>
          <ul className={style.navList}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Auth">Formaaaa</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
