import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../Hooks";
import { fetchItems } from "../../../Redux/Slices/FilmsSlice";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import style from "./Films.module.css";

interface HandleOpenProps {
  handleOpen: (title: string) => void;
}

export const FilmsCard = ({ handleOpen }: HandleOpenProps) => {
  const films = useAppSelector((state) => state.films.films);
  const loading = useAppSelector((state) => state.films.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>("");

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

  return (
    <div className={style.container}>
      <div className={style.filterWrapper}>
        <input
          type="text"
          placeholder="Search for a movie..."
          className={style.searchInput}
          value={searchQuery}
          onChange={handleSearch}
        />
        <i className={`fas fa-search ${style.searchIcon}`} />
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
            <div key={film.id} className={style.card}>
              <img
                src={film.imageUrl}
                alt={film.title}
                className={style.image}
                onClick={() => handleCardClick(film.id)}
              />
              <div className={style.infoBlock}>
                <h3 className={style.title}>{film.title}</h3>
                <button
                  className={style.btnInfoBlock}
                  onClick={() => handleOpen(film.title)}
                >
                  Tickets
                </button>
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
