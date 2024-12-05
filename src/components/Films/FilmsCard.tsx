import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks";
import { fetchItems } from "../../Redux/Slices/FilmsSlice";
import style from "./Films.module.css";

export const FilmsCard = () => {
  const films = useAppSelector((state) => state.films.films);
  const loading = useAppSelector((state) => state.films.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div className={style.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className={style.cardList}>
          {films.map((film) => (
            <li key={film.id} className={style.card}>
              <img
                src={film.imageUrl}
                alt={film.title}
                className={style.image}
              />
              <div className={style.infoBlock}>
                <div className={style.infoBlockLeft}>
                  <h3 className={style.title}>{film.title}</h3>
                  <p className={style.rating}>Rating: {film.rating}</p>
                </div>
                <div>
                  <button className={style.btnInfoBlock}>Tickets</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
