import { FilmsCards } from "../../shared/ui/FilmsCards";
import { HomeCarousel } from "../../shared/ui/HomeCarousel";

interface handleOpenProps {
  handleOpen: (title: string) => void;
}

export const HomePage = ({ handleOpen }: handleOpenProps) => {
  return (
    <div>
      <HomeCarousel />
      <FilmsCards />
    </div>
  );
};
