import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import FetchCats from "../components/FetchCats/FetchCats"; 
import FetchRaces from "../components/FetchRaces/FetchRaces"; 
import RaceDetails from "../components/RaceDetails/RaceDetails"; 
import NotFoundPage from "../pages/NotFOundPage";
import Contact from "../components/Contact/Contact";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cats" element={<FetchCats />} />
      <Route path="/races" element={<FetchRaces />} />
      <Route path="/races/:breedId" element={<RaceDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
