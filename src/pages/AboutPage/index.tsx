import React from "react";
import style from "./ui.module.css";

export const AboutPage = () => {
  return (
    <div className={style.aboutPageContainer}>
      <header className={style.header}>
        <h1 className={style.title}>О НАС</h1>
        <p className={style.subtitle}>
          Добро пожаловать в Cinema — место, где оживает магия кино.
        </p>
      </header>

      <section className={style.aboutSection}>
        <div className={style.textContainer}>
          <h2 className={style.sectionTitle}>О кинотеатре Cinema</h2>
          <p className={style.text}>
            Cinema — это уютное место, созданное для настоящих любителей кино. У
            нас вы найдёте комфортные залы, первоклассное обслуживание и самые
            новые фильмы.
          </p>
        </div>
      </section>

      <section className={style.featuresSection}>
        <h2 className={style.sectionTitle}>Наши особенности</h2>
        <ul className={style.featuresList}>
          <li className={style.featureItem}>
            Современные залы с великолепным звуком и изображением.
          </li>
          <li className={style.featureItem}>
            Широкий выбор фильмов для любой аудитории.
          </li>
          <li className={style.featureItem}>
            Уютная атмосфера для всей семьи и дружеских встреч.
          </li>
        </ul>
      </section>

      <section className={style.ctaSection}>
        <h2 className={style.ctaTitle}>Присоединяйтесь к нам!</h2>
        <p className={style.ctaText}>
          Посетите Cinema и откройте для себя мир удивительных историй.
        </p>
        <button className={style.ctaButton}>Купить билеты</button>
      </section>
    </div>
  );
};
