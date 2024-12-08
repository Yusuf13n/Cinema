import { Carousel } from "antd";
import style from "./Avatar.module.css";

import Moana from "../../../assets/HomeImage/Moana 2.jpeg";
import Wicked from "../../../assets/HomeImage/Wicked.jpeg";
import Gladiator from "../../../assets/HomeImage/Gladiator 2.png";
import Heretic from "../../../assets/HomeImage/Heretic.jpg";

export const AvatarHome: React.FC = () => {
  
  return (
    <Carousel autoplay autoplaySpeed={6000} className={style.carousel}>
      <div className={style.filmInfo}>
        <div className={style.imgOverlay}>
          <img className={style.carouselImage} src={Moana} alt="Moana" />
        </div>
        <div>
          <h1>Moana</h1>
          <p>An adventurous story of Moana's journey to save her people.</p>
          <button>See more</button>
        </div>
      </div>
      <div className={style.filmInfo}>
        <div className={style.imgOverlay}>
          <img className={style.carouselImage} src={Wicked} alt="Wicked" />
        </div>
        <div>
          <h1>Wicked</h1>
          <p>The untold story of the witches of Oz.</p>
          <button>See more</button>
        </div>
      </div>
      <div className={style.filmInfo}>
        <div className={style.imgOverlay}>
          <img
            className={style.carouselImage}
            src={Gladiator}
            alt="Gladiator"
          />
        </div>
        <div>
          <h1>Gladiator 2</h1>
          <p>A betrayed gladiator seeks revenge against the corrupt emperor.</p>
          <button>See more</button>
        </div>
      </div>
      <div className={style.filmInfo}>
        <div className={style.imgOverlay}>
          <img className={style.carouselImage} src={Heretic} alt="Heretic" />
        </div>
        <div>
          <h1>Heretic</h1>
          <p>A tale of faith and power in the medieval world.</p>
          <button>See more</button>
        </div>
      </div>
    </Carousel>
  );
};
