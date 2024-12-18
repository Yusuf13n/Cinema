import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchItems } from "../../../redux/slices/filmsSlice";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./ui.module.css";


export const FilmsCards = () => {
  const films = useAppSelector((state) => state.films.films);
  const loading = useAppSelector((state) => state.films.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hoverColor, setHoverColor] = useState<string>("default");

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleCardClick = (id: number) => {
    navigate(`/film/${id}`);
  };

  const filteredFilms = films.filter((film) =>
    film.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 7) return style.highRating;
    if (rating >= 5) return style.mediumRating;
    return style.lowRating;
  };

  return (
    <div className={style.container}>
      <div className={style.titleUp}>
        <h2>Now in cinemas</h2>
      </div>
      <div className={style.inputFilterContain}>
        <div className={style.searchWrapper}>
          <input
            type="text"
            placeholder="Search for a movie..."
            className={style.searchInput}
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className={style.filterWrapper}>
          <div className={style.dropdown}>
            <button className={style.dropdownButton}>Genre</button>
            <ul className={style.dropdownMenu}>
              <li>Action</li>
              <li>Comedy</li>
              <li>Drama</li>
              <li>Horror</li>
              <li>Romance</li>
            </ul>
          </div>
        </div>
      </div>

      {loading ? (
        <ul className={style.cardList}>
          {[...Array(6)].map((_, index) => (
            <div key={index} className={style.card}>
              <Skeleton
                height={600}
                width={400}
                className={style.skeletonCard}
              />
            </div>
          ))}
        </ul>
      ) : (
        <ul className={style.cardList}>
          {filteredFilms.map((film) => (
            <div key={film.id} className={`${style.card} ${style[hoverColor]}`}>
              <div className={style.imageContainer}>
                <img
                  src={film.imageUrl}
                  alt={film.title}
                  className={style.image}
                  onClick={() => handleCardClick(film.id)}
                />
                <span
                  className={`${style.rating} ${getRatingColor(film.rating)}`}
                >
                  {film.rating}
                </span>
              </div>
              <div className={style.cardBottom}>
                <div className={style.title}>{film.title}</div>
                {/* <button
                  className={style.btnInfoBlock}
                  onClick={() => handleOpen(film.title)}
                >
                  Tickets
                </button> */}
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
