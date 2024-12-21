import React, { FC } from 'react';
import style from './ui.module.css';

export const Contacts: FC = () => {
  return (
    <div className={style.contactContainer}>
      <h1 className={style.contactHeader}>Contact</h1>
      <div className={style.contactInfo}>
        <p><strong>Адрес:</strong> г. Москва, ул. Кинотеатральная, д. 5</p>
        <p><strong>Телефон:</strong> +7 (123) 456-78-90</p>
        <p><strong>Email:</strong> support@cinema.ru</p>
        <p><strong>Режим работы:</strong> Пн-Вс: 10:00 - 22:00</p>
      </div>
      <div className={style.contactForm}>
        <h2>Свяжитесь с нами</h2>
        <form>
          <label htmlFor="name">Имя</label>
          <input type="text" id="name" name="name" placeholder="Ваше имя" required />
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Ваш email" required />
          <label htmlFor="message">Сообщение</label>
          <textarea id="message" name="message" rows={5} placeholder="Ваше сообщение" required></textarea>
          <button type="submit">Отправить</button>
        </form>
      </div>
    </div>
  );
};
