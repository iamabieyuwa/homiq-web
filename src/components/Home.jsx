import Hero from "../components/Hero";
import Categories from "../components/Categories";
//import TopLocations from "../components/TopLocations";
import FeaturedListings from "../components/FeaturedListings";
import CallToAction from "../components/CallToAction";

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      {/*<TopLocations />*/}
      <FeaturedListings />
      <CallToAction />
    </>
  );
};

export default Home;
