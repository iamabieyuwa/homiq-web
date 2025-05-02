import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const mockData = {
  1: {
    title: "2 Bedroom Flat in Ugbowo",
    location: "Ugbowo, Benin City",
    price: "₦400,000 / year",
    images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    video: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    description:
      "Spacious 2 bedroom flat with borehole, prepaid meter, POP ceiling, in a fenced and gated compound just 5 mins walk to Uniben main gate.",
    contact: "08012345678",
  },
  2: {
    title: "Self-Contain at Upper Sakponba",
    location: "Upper Sakponba, Benin City",
    price: "₦150,000 / year",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    ],
    video: "",
    description: "Clean self-contain with running water and security, power available.",
    contact: "08023456789",
  },
};

const PropertyDetails = () => {
  const { id } = useParams();
  const listing = mockData[id];

  if (!listing) {
    return <div className="p-6">Property not found.</div>;
  }

  return (
    <section className="px-4 py-10 bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{listing.title}</h1>
        <p className="text-sm mb-4 text-primary">{listing.location}</p>
        <p className="text-lg font-semibold mb-6">{listing.price}</p>

        {/* Swiper Image/Video Gallery */}
        <Swiper navigation modules={[Navigation]} className="mb-6 rounded-lg overflow-hidden">
          {listing.images.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} alt={`property-${i}`} className="w-full h-[300px] object-cover" />
            </SwiperSlide>
          ))}
          {listing.video && (
            <SwiperSlide>
              <video controls className="w-full h-[300px] object-cover">
                <source src={listing.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </SwiperSlide>
          )}
        </Swiper>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-sm leading-relaxed">{listing.description}</p>
        </div>

        {/* Google Map Embed */}
        <div className="mb-6">
  <h2 className="text-xl font-semibold mb-2">Location on Map</h2>
  <iframe
    title="Google Map"
    src={`https://www.google.com/maps?q=${encodeURIComponent(listing.location)}&output=embed`}
    width="100%"
    height="300"
    allowFullScreen=""
    loading="lazy"
    className="rounded-lg border border-white/10"
  ></iframe>
</div>



        {/* Contact Seller */}
        <div className="flex justify-start">
          <a
            href={`https://wa.me/234${listing.contact.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Contact Seller on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
