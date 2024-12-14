import { Footer } from "../widgets/Footer";
import { Header } from "../widgets/Header";
import { Router } from "./router/Router";

export const App = () => {
  return (
    <div>
      <Header />
      <Router />
      <Footer />
    </div>
  );
};
