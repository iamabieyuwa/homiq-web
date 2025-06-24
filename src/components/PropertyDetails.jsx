import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import properties from "../data/properties";
import { FaCheckCircle, FaTag, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const property = properties.find((p) => p.id === Number(id));
    if (property) {
      setListing(property);
      setCurrentSlide(0); // Reset slider on new property
    } else {
      setListing(null);
    }
  }, [id]);

  // Recommendations for sidebar
  const recommendations = properties.filter((p) => p.id !== Number(id)).slice(0, 3);

  // Extract the numeric price and recurring period from the price string
  function getPriceParts(priceStr) {
    if (!priceStr) return { amount: 0, period: "" };
    // Match numbers with commas
    const match = priceStr.match(/([\d,]+)/);
    // Match period (/year or /month etc)
    const periodMatch = priceStr.match(/\/(year|month|week|day)/i);
    const amount = match ? Number(match[1].replace(/,/g, "")) : 0;
    const period = periodMatch ? `/${periodMatch[1]}` : "";
    return { amount, period };
  }

  const { amount, period } = getPriceParts(listing?.price);

  // Map source: use lat/lng if available, else use address/location
  const mapSrc = listing?.lat && listing?.lng
    ? `https://www.google.com/maps?q=${listing.lat},${listing.lng}&z=15&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(listing?.address || listing?.location)}&output=embed`;

  // --- Custom Slider Logic ---
  let slides = [];
  if (listing) {
    slides = Array.isArray(listing.images) ? [...listing.images] : [];
    if (listing.video) slides.push(listing.video);
  }
  const isVideo = (slide, idx) => listing?.video && slides.length - 1 === idx;

  // Auto-slide with pause on hover
  useEffect(() => {
    if (!slides.length) return;
    if (isHovered) return; // Pause auto-slide on hover
    slideInterval.current = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearTimeout(slideInterval.current);
  }, [currentSlide, slides.length, isHovered]);

  const goToSlide = (idx) => setCurrentSlide(idx);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  if (!listing) {
    return <div className="p-6 text-center">Property not found.</div>;
  }

  return (
    <section className="px-4 py-10 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">{listing.title}</h1>
            <p className="text-primary text-sm mb-2">{listing.address || listing.location}</p>
            <p className="text-xl font-semibold">
              ₦{amount.toLocaleString()}
              <span className="text-base font-normal text-gray-500">{period}</span>
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {listing.category && (
                <span className="inline-flex items-center gap-1 text-xs bg-primary text-white px-2 py-1 rounded">
                  <FaTag size={12} />
                  {listing.category}
                </span>
              )}
              {listing.verified && (
                <span className="inline-flex items-center gap-1 text-xs bg-red-600 text-white px-2 py-1 rounded">
                  <FaCheckCircle size={12} />
                  Verified
                </span>
              )}
            </div>
          </div>

          {/* Custom Image/Video Gallery with Nav, Dots & Slide Indicator */}
          <div
            className="relative rounded-lg overflow-hidden shadow-lg h-[300px] flex items-center justify-center bg-gray-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {slides.length > 0 && (
              isVideo(slides[currentSlide], currentSlide) ? (
                <video
                  controls
                  className="w-full h-[300px] object-cover"
                  poster={slides[0]}
                >
                  <source src={slides[currentSlide]} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={slides[currentSlide]}
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full h-[300px] object-cover transition-all duration-500"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )
            )}

            {/* Prev/Next buttons */}
            {slides.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/70 hover:bg-primary hover:text-white text-black p-2 rounded-full shadow transition"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                  tabIndex={0}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/70 hover:bg-primary hover:text-white text-black p-2 rounded-full shadow transition"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  tabIndex={0}
                >
                  <FaChevronRight />
                </button>
              </>
            )}

            {/* Dots and 1/3 indicator */}
            {slides.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    className={`w-3 h-3 rounded-full border border-primary ${
                      idx === currentSlide ? "bg-primary" : "bg-white"
                    } transition outline-none`}
                    onClick={() => goToSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    tabIndex={0}
                  />
                ))}
                <span className="ml-4 text-xs text-gray-700 font-semibold">
                  {currentSlide + 1}/{slides.length}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Property Description</h2>
            <p className="text-sm leading-relaxed">{listing.description}</p>
          </div>

          {/* Additional Details */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Additional Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold">Type:</span> {listing.type || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Toilet:</span> {listing.toilet || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Electricity:</span> {listing.electricity || "N/A"}
              </div>
              <div>
                <span className="font-semibold">Water:</span> {listing.water || "N/A"}
              </div>
              {listing.extra && (
                <div className="sm:col-span-2">
                  <span className="font-semibold">Extra:</span> {listing.extra}
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Location on Map</h2>
            <iframe
              title="Google Map"
              src={mapSrc}
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
                href={`https://wa.me/234${listing.contact.replace(/^0/, "")}`}
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
          {recommendations.map((item) => {
            const { amount: recAmount, period: recPeriod } = getPriceParts(item.price);
            return (
              <Link to={`/property/${item.id}`} key={item.id}>
                <div className="bg-white border border-black/10 rounded-lg p-3 shadow hover:shadow-md transition mt-3 mb-3">
                  {Array.isArray(item.images) && item.images[0] && (
                    <img
                      src={item.images[0]}
                      alt=""
                      className="h-28 w-full object-cover rounded mb-2"
                    />
                  )}
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-primary text-sm">
                    ₦{recAmount.toLocaleString()}
                    <span className="text-xs font-normal text-gray-500">{recPeriod}</span>
                  </p>
                  <div className="flex flex-wrap gap-1 text-xs mt-1">
                    {item.category && (
                      <span className="inline-flex items-center gap-1 bg-primary text-white px-2 py-0.5 rounded">
                        <FaTag size={10} />
                        {item.category}
                      </span>
                    )}
                    {item.verified && (
                      <span className="inline-flex items-center gap-1 bg-red-600 text-white px-2 py-0.5 rounded">
                        <FaCheckCircle size={10} />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </aside>
      </div>
    </section>
  );
};

export default PropertyDetails;