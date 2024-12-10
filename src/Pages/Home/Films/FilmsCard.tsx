import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { fetchItems } from "../../../Redux/Slices/FilmsSlice";
import { useNavigate } from "react-router-dom";
import style from "./Films.module.css";

interface handleOpenProps {
  handleOpen: (title: string) => void
}

export const FilmsCard = ({handleOpen}: handleOpenProps) => {


  const films = useAppSelector((state) => state.films.films);
  const loading = useAppSelector((state) => state.films.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleCardClick = (id: number) => {
    navigate(`/film/${id}`);
  };

  return (
    <div className={style.container}>
      {loading ? (
        <p className={style.loading}>Loading...</p>
      ) : (
        <ul className={style.cardList}>
          {films.map((film) => (
            <div  key={film.id} className={style.card}>
              <img
                src={film.imageUrl}
                alt={film.title}
                className={style.image}
                onClick={() => handleCardClick(film.id)}
              />
              <div className={style.infoBlock}>
                <div className={style.infoBlockLeft}>
                  <h3 className={style.title}>{film.title}</h3>
                  <p className={style.rating}>Rating: {film.rating}</p>
                </div>
                <div>
                  <button className={style.btnInfoBlock} onClick={() => handleOpen(film.title)} >Tickets</button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
