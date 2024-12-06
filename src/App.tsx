import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Router } from "./Pages/Router/Router";
import { FilmsCard } from "./Pages/Home/Films/FilmsCard";

export const App = () => {
  return (
    <div>
      <Header />
      <Router />
      <Footer />
    </div>
  );
};
