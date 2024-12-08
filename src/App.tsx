import { Header } from "./components/Header/Header";
import { Router } from "./Pages/Router/Router";
import { Footer } from "./components/Footer/Footer";

export const App = () => {
  return (
    <div>
      <Header />
      <Router />
      {/* <Footer /> */}
    </div>
  );
};
