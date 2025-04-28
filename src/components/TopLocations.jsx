const locations = [
  {
    name: "Ugbowo",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "GRA",
    image: "https://media.istockphoto.com/id/2180341019/photo/smart-city-digital-transformation-development-concept.webp?a=1&b=1&s=612x612&w=0&k=20&c=R2kt3KFaxwN_g5mARDUDNZd-RgXytdDVK1FU2GIjIsM=",
  },
  {
    name: "Ring Road",
    image: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sapele Road",
    image: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Upper Sakponba",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Airport Road",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const TopLocations = () => {
  return (
    <section className="px-4 py-16 bg-white dark:bg-black text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Explore <span className="text-primary">Benin Locations</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="relative h-32 rounded-lg overflow-hidden group cursor-pointer shadow hover:shadow-lg transition"
            >
              <img
                src={loc.image}
                alt={loc.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
              <h3 className="relative z-10 text-white  font-semibold text-center h-full flex items-center justify-center text-sm sm:text-base">
                {loc.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopLocations;
