import { FaMapMarkerAlt, FaCamera, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import properties from "../data/properties";

// If you want to only show certain listings, add a "featured" field to properties.js and filter here.
// For now, feature the first 3 properties.
const getFeaturedListings = () => properties.slice(0, 3);

const FeaturedListings = () => {
  const featuredListings = getFeaturedListings();

  return (
    <section className="px-4 py-16 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured <span className="text-primary">Listings</span>
        </h2>

        {/* Make cards equal height using h-full and flex-col, and grid with auto-rows-fr */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {featuredListings.map((listing) => (
            <Link to={`/property/${listing.id}`} key={listing.id} className="h-full">
              <div className="flex flex-col h-full bg-white border border-black/10 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <img
                    src={listing.images && listing.images[0]}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  {/* If you plan to use a video property, show video icon */}
                  {listing.video && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-2">
                      <FaVideo />
                    </div>
                  )}
                  {listing.images && listing.images.length > 1 && (
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white rounded-full p-2 text-xs flex items-center gap-1">
                      <FaCamera />
                      {listing.images.length}
                    </div>
                  )}
                  {listing.verified && (
                    <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold rounded-full px-3 py-1 shadow">
                      Verified
                    </div>
                  )}
                  {listing.sold && (
                    <div className="absolute bottom-2 right-2 bg-gray-800/80 text-white text-xs font-bold rounded-full px-3 py-1 shadow">
                      Sold
                    </div>
                  )}
                </div>
                <div className="p-4 space-y-2 flex flex-col flex-1">
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <p className="flex items-center text-sm gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    {listing.location}
                  </p>
                  <p className="text-primary font-bold">{listing.price}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs mt-2">
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      Toilet: {listing.toilet}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      Elec: {listing.electricity}
                    </span>
                    <span className="bg-gray-100 px-2 py-1 rounded">
                      Water: {listing.water}
                    </span>
                  </div>
                  {listing.extra && (
                    <div className="text-xs text-gray-500 mt-1 italic">
                      {listing.extra}
                    </div>
                  )}
                  {/* Push the bottom content to the bottom for equal heights */}
                  <div className="flex-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;