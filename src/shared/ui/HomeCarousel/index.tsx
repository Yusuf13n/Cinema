import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Item } from "../../../redux/slices/homeSlice";
import Carousel from "antd/lib/carousel";
import style from "./ui.module.css";

export const HomeCarousel: React.FC = () => {
  const items: Item[] = useSelector((state: RootState) => state.carousel.items);

  return (
    <Carousel autoplay autoplaySpeed={4000} className={style.carousel}>
      {items.map((item: Item) => (
        <div key={item.id} className={style.filmInfo}>
          <div className={style.imgOverlay}>
            <img
              className={style.carouselImage}
              src={item.image}
              alt={item.title}
            />
          </div>
        </div>
      ))}
    </Carousel>
  );
};
