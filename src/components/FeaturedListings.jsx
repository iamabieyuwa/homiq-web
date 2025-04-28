import { FaMapMarkerAlt, FaCamera, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

const mockListings = [
  {
    id: 1,
    title: "2 Bedroom Flat in Ugbowo",
    location: "Ugbowo, Benin City",
    price: "₦400,000 / year",
    images:[ "https://plus.unsplash.com/premium_photo-1674676471104-3c4017645e6f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBhcnRtZW50fGVufDB8fDB8fHww",],
    video : "",
    shortDescription: "Affordable 2 bedroom flat close to Uniben, tiled floors and borehole water.",
  },
  {
    id: 2,
    title: "Self-Contain at Upper Sakponba",
    location: "Upper Sakponba, Benin City",
    price: "₦150,000 / year",
    images: ["https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",],
    video : "",
    shortDescription: "Self-contain apartment with steady light and secured compound.",
  },
  {
    id: 3,
    title: "Mini Flat in Sapele Road",
    location: "Sapele Road, Benin City",
    price: "₦250,000 / year",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",],
    video : "",
    shortDescription: "Spacious mini flat, water available, POP ceiling, fenced with gate.",
  },
];




const FeaturedListings = () => {
  return (
    <section className="px-4 py-16 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Featured <span className="text-primary">Listings</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockListings.map((listing) => (
            <Link to={`/property/${listing.id}`} key={listing.id}>
              <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="relative">
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-48 object-cover"
                  />
                  {listing.video && (
                    <div className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-2">
                      <FaVideo />
                    </div>
                  )}
                  {listing.images.length > 1 && (
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
                    {listing.shortDescription}
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