import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { setActiveSlide } from "../../../Redux/Slices/HomeSlice";
import { Item } from "../../../Redux/Slices/HomeSlice";
import Carousel from "antd/lib/carousel";
import style from "./Avatar.module.css";

export const AvatarHome: React.FC = () => {
  const dispatch = useDispatch();

  const items: Item[] = useSelector((state: RootState) => state.carousel.items);

  const handleSlideChange = (newIndex: number) => {
    dispatch(setActiveSlide(newIndex));
  };

  return (
    <Carousel
      autoplay
      autoplaySpeed={4000}
      className={style.carousel}
      beforeChange={(oldIndex, newIndex) => handleSlideChange(newIndex)}
    >
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
