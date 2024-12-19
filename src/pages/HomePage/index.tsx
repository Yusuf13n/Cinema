import { FilmsCards } from "../../shared/ui/FilmsCards";
import { HomeCarousel } from "../../shared/ui/HomeCarousel";

export const HomePage = () => {
  return (
    <div>
      <HomeCarousel />
      <FilmsCards />
    </div>
  );
};
