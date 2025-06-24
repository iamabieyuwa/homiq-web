import {
  FaHome,
  FaBuilding,
  FaHotel,
  FaWarehouse,
  FaStore,
  FaBriefcase,
} from "react-icons/fa";

const categories = [
  { title: "Apartment", icon: <FaHome /> },
  { title: "Self Contain", icon: <FaHotel /> },
  { title: "Duplex", icon: <FaBuilding /> },
  { title: "Bungalow", icon: <FaWarehouse /> },
  { title: "Shortlet", icon: <FaStore /> },
  { title: "Commercial", icon: <FaBriefcase /> },
];

const Categories = () => {
  return (
    <section className="px-4 py-16 bg-white text-black">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10">
          Browse <span className="text-primary">Categories</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-white border border-black/10 p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="text-primary text-2xl mb-2">{cat.icon}</div>
              <p className="text-sm font-medium">{cat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;