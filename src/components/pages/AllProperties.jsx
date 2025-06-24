import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const mockProperties = [
  {
    id: 1,
    title: "3 Bedroom Duplex in Lekki",
    location: "Lekki Phase 1, Lagos",
    price: "₦120,000,000",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    id: 2,
    title: "Luxury Apartment in Abuja",
    location: "Maitama, Abuja",
    price: "₦85,000,000",
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  },
  {
    id: 3,
    title: "Self-contained BQ",
    location: "Yaba, Lagos",
    price: "₦350,000 / year",
    image:
      "https://images.unsplash.com/photo-1572120360610-d971b9b78828",
  },
  {
    id: 4,
    title: "Mini Flat with Parking",
    location: "Gwarinpa, Abuja",
    price: "₦450,000 / year",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba934822d",
  },
];

const AllProperties = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 py-16 bg-white text-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          All <span className="text-primary">Properties</span>
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white border border-black/10 rounded-lg shadow-md overflow-hidden transition hover:scale-[1.02] hover:shadow-lg flex flex-col"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 space-y-2 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold">{property.title}</h3>
                <p className="flex items-center text-sm gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  {property.location}
                </p>
                <p className="text-primary font-bold">{property.price}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    className="flex-1 bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition"
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="flex-1 bg-black text-white py-2 rounded font-semibold hover:bg-gray-800 transition"
                    onClick={() => alert("Contact agent or request info for " + property.title)}
                  >
                    Contact Agent
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProperties;