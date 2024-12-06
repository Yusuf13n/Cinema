import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import style from "./FilmsDetail.module.css";

export const FilmDetail = () => {
  const { id } = useParams<{ id: string }>();

  const film = useSelector((state: RootState) =>
    state.films.films.find((film) => film.id === parseInt(id || "", 10))
  );

  if (!film) {
    return <p>Loading...</p>;
  }

  return (
    <div className={style.container}>
      <div className={style.content}>
        <div className={style.imageContainer}>
          <img src={film.imageUrl} alt={film.title} className={style.image} />
        </div>

        <div className={style.details}>
          <h1 className={style.title}>{film.title}</h1>
          <p className={style.rating}>Rating: {film.rating}</p>
          <p className={style.description}>{film.description}</p>

          <div className={style.videoContainer}>
            <iframe
              width="560"
              height="315"
              src={film.srcVideo}
              title="Film Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
