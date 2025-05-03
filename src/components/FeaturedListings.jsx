import { FaMapMarkerAlt, FaCamera, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import properties from "../data/properties";

// If you want to only show certain listings, add a "featured" field to properties.js and filter here.
// For now, feature the first 3 properties.
const getFeaturedListings = () => properties.slice(0, 3);

const FeaturedListings = () => {
  const featuredListings = getFeaturedListings();

  return (
    <section className="px-4 py-16 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured <span className="text-primary">Listings</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings.map((listing) => (
            <Link to={`/property/${listing.id}`} key={listing.id}>
              <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <img
                    src={listing.images && listing.images[0]}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
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
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-semibold">{listing.title}</h3>
                  <p className="flex items-center text-sm gap-2">
                    <FaMapMarkerAlt className="text-primary" />
                    {listing.location}
                  </p>
                  <p className="text-primary font-bold">{listing.price}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {listing.shortDescription ? listing.shortDescription : listing.description}
                  </p>
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