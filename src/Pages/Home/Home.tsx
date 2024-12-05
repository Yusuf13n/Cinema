import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { RootState } from "../../Redux/Store";
import { setActiveSlide } from "../../Redux/Slices/HomeSlice";

import style from "./Home.module.css";

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const { items, activeSlide } = useSelector(
    (state: RootState) => state.HomeSlice
  );

  const lastPosition = items.length - 1;

  const nextSlide = () =>
    dispatch(
      setActiveSlide(activeSlide + 1 > lastPosition ? 0 : activeSlide + 1)
    );
  const prevSlide = () =>
    dispatch(
      setActiveSlide(activeSlide - 1 < 0 ? lastPosition : activeSlide - 1)
    );
  const selectSlide = (index: number) => dispatch(setActiveSlide(index));

  useEffect(() => {
    const autoPlay = setInterval(nextSlide, 5000);
    return () => clearInterval(autoPlay);
  }, [activeSlide]);

  return (
    <section className={style.carousel}>
      <div className={style.list}>
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`${style.item} ${
              index === activeSlide ? style.active : ""
            }`}
            style={{ transform: `translateX(${100 * (index - activeSlide)}%)` }}
          >
            <figure>
              <img src={item.image} alt={item.title} />
            </figure>
            <div className={style.content}>
              <h2>{item.title}</h2>
              <p className={style.description}>{item.description}</p>
              <div className={style.more}>
                <button>Add To Cart</button>
                <button className={style.btnMore}>
                  <Link to="">
                    <FontAwesomeIcon icon={faPlay} /> See More
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={style.arrows}>
        <button id="prev" onClick={prevSlide}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button id="next" onClick={nextSlide}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
      <div className={style.indicators}>
        <ul>
          {items.map((_, index) => (
            <li
              key={index}
              className={index === activeSlide ? style.active : ""}
              onClick={() => selectSlide(index)}
            ></li>
          ))}
        </ul>
      </div>
    </section>
  );
};
