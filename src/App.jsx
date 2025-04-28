import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedListings from './components/FeaturedListings'
import Categories from "./components/Categories";
import TopLocations from "./components/TopLocations";
import CallToAction from "./components/CallToAction";
import AllProperties from "./components/pages/AllProperties";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <TopLocations />
      <FeaturedListings />
      <CallToAction />
      
    <Routes>
      
      <Route path="/properties" element={<AllProperties />} />
      </Routes>
      </>
  );
}

export default App;
