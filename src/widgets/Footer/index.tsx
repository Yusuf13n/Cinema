import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

import style from './ui.module.css';

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.branding}>
          <h1 className={style.logo}>Cinema</h1>
          <p className={style.description}>
            Welcome to Cinema, your gateway to an unforgettable movie experience. Enjoy blockbuster hits, indie gems, and timeless classics in a cozy and modern setting.
          </p>
        </div>
        <div className={style.links}>
          <h3 className={style.sectionTitle}>Quick Links</h3>
          <ul className={style.list}>
            <li><a href="" className={style.link}>About Us</a></li>
            <li><a href="" className={style.link}>Blog</a></li>
            <li><a href="" className={style.link}>Contact Us</a></li>
          </ul>
        </div>
        <div className={style.contact}>
          <h3 className={style.sectionTitle}>Contact Us</h3>
          <p className={style.contactInfo}>Email: support@cinema.com</p>
          <p className={style.contactInfo}>Phone: +1 (800) 123-4567</p>
          <p className={style.contactInfo}>Address: 123 Movie Street, Hollywood, CA</p>
        </div>
        <div className={style.social}>
          <h3 className={style.sectionTitle}>Follow Us</h3>
          <div className={style.socialIcons}>
            <a href="https://facebook.com" className={style.icon} aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" className={style.icon} aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" className={style.icon} aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" className={style.icon} aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="https://linkedin.com" className={style.icon} aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className={style.bottom}>
        <p>&copy; 2024 Cinema. Yusuf feat Ilyas</p>
      </div>
    </footer>
  );
};
