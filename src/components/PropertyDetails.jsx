import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import properties from "../data/properties";

import { FaCheckCircle, FaTag } from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const property = properties.find((p) => p.id === Number(id));
    if (property) {
      setListing(property);
    } else {
      setListing(null);
    }
  }, [id]);

  const recommendations = properties.filter((p) => p.id !== Number(id)).slice(0, 3);

  if (!listing) {
    return <div className="p-6 text-center">Property not found.</div>;
  }

  return (
    <section className="px-4 py-10 bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">{listing.title}</h1>
            <p className="text-primary text-sm mb-2">{listing.location}</p>
            <p className="text-xl font-semibold">{listing.price}</p>

            {/* Badges with Icons */}
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="inline-flex items-center gap-1 text-xs bg-primary text-white px-2 py-1 rounded">
                <FaTag size={12} />
                {listing.category}
              </span>
              {listing.verified && (
                <span className="inline-flex items-center gap-1 text-xs bg-green-600 text-white px-2 py-1 rounded">
                  <FaCheckCircle size={12} />
                  Verified
                </span>
              )}
            </div>
          </div>

          {/* Swiper Image/Video Gallery */}
          <Swiper
            key={listing.id} // 👈 this forces Swiper to reset on property change
            navigation
            modules={[Navigation]}
            className="rounded-lg overflow-hidden"
          >
            {Array.isArray(listing.images) &&
              listing.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt=""
                    className="w-full h-[300px] object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </SwiperSlide>
              ))}
            {listing.video && (
              <SwiperSlide>
                <video controls className="w-full h-[300px] object-cover">
                  <source src={listing.video} type="video/mp4" />
                </video>
              </SwiperSlide>
            )}
          </Swiper>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Property Description</h2>
            <p className="text-sm leading-relaxed">{listing.description}</p>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Location on Map</h2>
            <iframe
              title="Google Map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                listing.location
              )}&output=embed`}
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              className="rounded-lg border border-white/10"
            ></iframe>
          </div>

          {/* Contact Seller */}
          <div>
            {listing.contact ? (
              <a
                href={`https://wa.me/234${listing.contact.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
              >
                Contact Seller on WhatsApp
              </a>
            ) : (
              <div className="text-sm text-red-600">No contact info available</div>
            )}
          </div>
        </div>

        {/* Right: Sidebar */}
        <aside className="space-y-4">
          <h2 className="text-xl font-semibold mb-2 border-b pb-2">More Listings</h2>
          {recommendations.map((item) => (
            <Link to={`/property/${item.id}`} key={item.id}>
              <div className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg p-3 shadow hover:shadow-md transition mt-3 mb-3">
                {Array.isArray(item.images) && item.images[0] && (
                  <img
                    src={item.images[0]}
                    alt=""
                    className="h-28 w-full object-cover rounded mb-2"
                  />
                )}
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-primary text-sm">{item.price}</p>

                {/* Sidebar badges */}
                <div className="flex flex-wrap gap-1 text-xs mt-1">
                  <span className="inline-flex items-center gap-1 bg-primary text-white px-2 py-0.5 rounded">
                    <FaTag size={10} />
                    {item.category}
                  </span>
                  {item.verified && (
                    <span className="inline-flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded">
                      <FaCheckCircle size={10} />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </aside>
      </div>
    </section>
  );
};

export default PropertyDetails;