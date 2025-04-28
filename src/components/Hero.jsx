import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1572120360610-d971b9b78828",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
  "https://images.unsplash.com/photo-1598928506312-c85b1f66b7a4",
  "https://images.unsplash.com/photo-1613977257363-707ba934822d",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slideshow Background */}
      <div className="absolute inset-0 z-0">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`house-${idx}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-4 text-white">
        <div className="max-w-2xl w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
            Discover Your Dream <span className="text-primary">Home</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 text-white">
            Explore the best properties to buy, rent, or lease in Nigeria.
          </p>

          {/* Search Bar */}
          {/* Search Bar */}
<div className="flex items-stretch justify-center gap-0 max-w-md mx-auto mt-6">
  <input
    type="text"
    placeholder="Search location or property..."
    className="w-full px-4 py-2.5 md:py-3 text-sm md:text-base border border-white dark:border-white rounded-l-full focus:outline-none bg-white text-black placeholder:text-black/60 dark:bg-black dark:text-white dark:placeholder:text-white/60"
  />
  <button className="bg-primary text-white px-5 md:px-6 py-2.5 md:py-3 rounded-r-full font-semibold text-sm md:text-base hover:opacity-90 transition">
    Search
  </button>
</div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
