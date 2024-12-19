import { Route, Routes, useNavigate } from "react-router-dom";
import { Modal } from "../../shared/ui/ModalPlaces";
import { useState } from "react";
import { FilmDetailPage } from "@/pages/FilmDetailPage";
import { AuthenticationPage } from "@/pages/AuthenticationPage";
import { HomePage } from "@/pages/HomePage";

export const Router = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedFilmTitle, setSelectedFilmTitle] = useState<string>("");

  const handleOpen = (title: string) => {
    setSelectedFilmTitle(title);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Routes>
      <Route path="/" element={<HomePage handleOpen={handleOpen} />} />{" "}
      <Route
        path="/film/:id"
        element={
          <>
            {isOpen && (
              <Modal handleClose={handleClose} title={selectedFilmTitle} />
            )}
            <FilmDetailPage handleOpen={handleOpen} />
          </>
        }
      />
      <Route path="/Auth" element={<AuthenticationPage />} />
    </Routes>
  );
};
