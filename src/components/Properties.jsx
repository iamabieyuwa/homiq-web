import { useState } from "react";
import { useNavigate } from "react-router-dom";
import properties from "../data/properties";

export default function Properties() {
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const navigate = useNavigate();

  // Utility to extract numeric price for filtering
  function getPriceNumber(priceStr) {
    if (!priceStr) return 0;
    const match = priceStr.match(/([\d,]+)/);
    return match ? Number(match[1].replace(/,/g, "")) : 0;
  }

  // Filter logic
  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(search.toLowerCase()));
    const priceNum = getPriceNumber(p.price);
    const matchesMin = min === "" || priceNum >= Number(min);
    const matchesMax = max === "" || priceNum <= Number(max);
    return matchesSearch && matchesMin && matchesMax;
  });

  // For price/period display on cards
  function getPriceParts(priceStr) {
    if (!priceStr) return { amount: 0, period: "" };
    const match = priceStr.match(/([\d,]+)/);
    const periodMatch = priceStr.match(/\/(year|month|week|day)/i);
    const amount = match ? Number(match[1].replace(/,/g, "")) : 0;
    const period = periodMatch ? `/${periodMatch[1]}` : "";
    return { amount, period };
  }

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Browse Properties</h1>

      <form className="flex flex-wrap gap-4 mb-8 items-end">
        <input
          type="search"
          className="border rounded px-3 py-2 flex-1 min-w-[200px]"
          placeholder="Search by title, description, or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Min Price</label>
          <input
            type="number"
            className="border rounded px-3 py-2 w-28"
            placeholder="Min"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            min={0}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Max Price</label>
          <input
            type="number"
            className="border rounded px-3 py-2 w-28"
            placeholder="Max"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            min={0}
          />
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 py-24">
            No properties found.
          </div>
        ) : (
          filtered.map((property) => {
            const { amount, period } = getPriceParts(property.price);
            return (
              <div
                key={property.id}
                className="bg-white dark:bg-black rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                onClick={() => navigate(`/property/${property.id}`)}
              >
                {Array.isArray(property.images) && property.images[0] && (
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="font-bold text-xl mb-1 text-primary">{property.title}</h2>
                  <div className="mb-2 text-gray-700">
                    ₦{amount.toLocaleString()}
                    <span className="text-xs text-gray-500">{period}</span>
                  </div>
                  <div className="text-gray-600 line-clamp-2">{property.description}</div>
                  {property.location && (
                    <div className="text-xs text-gray-400 mt-1">{property.location}</div>
                  )}
                  {property.verified && (
                    <span className="inline-block mt-2 text-xs bg-green-600 text-white px-2 py-1 rounded">
                      Verified
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}