import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
const CallToAction = () => {
  const navigate = useNavigate();

  const PostProperty = () => {
    navigate("/agents/login");
  };

  const BrowseListings = () => {
    navigate("/properties");
  };
    return (
      <>
      <section className="px-4 py-16 bg-primary text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Ready to Post Your Property?
          </h2>
          <p className="text-lg">
            List your apartment, house, or commercial property in just a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={PostProperty} className="bg-white text-primary cursor-pointer font-semibold px-6 py-3 rounded-full hover:opacity-90 transition">
              Post a Property
            </button>
            <button onClick={BrowseListings} className="border border-white px-6 py-3 rounded-full font-semibold cursor-pointer hover-opacity:90 hover:text-primary transition ">
              Browse Listings
            </button>
          </div>
        </div>
      </section>
      <Footer />
      </>
    );
  };
  
  export default CallToAction;
  