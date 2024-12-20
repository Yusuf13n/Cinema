import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { fetchItems } from "../../../redux/slices/FilmsSlice";
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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "none">("none");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleCardClick = (id: number) => {
    navigate(`/film/${id}`);
  };

  const filteredFilms = films
    .filter((film) =>
      film.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.rating - b.rating;
      if (sortOrder === "desc") return b.rating - a.rating;
      return 0;
    });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const selectSortOrder = (order: "asc" | "desc" | "none") => {
    setSortOrder(order);
    setDropdownOpen(false);
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
            <button className={style.dropdownButton} onClick={toggleDropdown}>
              Rating
            </button>
            {dropdownOpen && (
              <ul className={style.dropdownMenu}>
                <li
                  className={style.dropdownItem}
                  onClick={() => selectSortOrder("asc")}
                >
                  Ascending
                </li>
                <li
                  className={style.dropdownItem}
                  onClick={() => selectSortOrder("desc")}
                >
                  Descending
                </li>
                <li
                  className={style.dropdownItem}
                  onClick={() => selectSortOrder("none")}
                >
                  Stock
                </li>
              </ul>
            )}
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
              </div>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
