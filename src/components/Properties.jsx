import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import properties from "../data/properties";

// Badge for details with the same styling as FeaturedListings (gray background)
// No green/red logic here
function propBadge(label, value) {
  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 text-gray-700 text-xxs font-semibold mr-1 mb-1"
      title={label + ": " + value}
    >
      <span className="font-semibold">{label}:</span> {value}
    </span>
  );
}

export default function Properties() {
  const [search, setSearch] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [verified, setVerified] = useState("");
  const navigate = useNavigate();

  // Unique lists for dropdowns
  const locations = [...new Set(properties.map((p) => p.location))];
  const categories = [...new Set(properties.map((p) => p.category))];
  // Gather all price numbers, sort and dedupe for options
  const prices = [
    ...new Set(
      properties
        .map((p) => {
          const match = p.price?.match(/([\d,]+)/);
          return match ? Number(match[1].replace(/,/g, "")) : 0;
        })
        .filter((n) => n > 0)
    ),
  ].sort((a, b) => a - b);

  function getPriceNumber(priceStr) {
    if (!priceStr) return 0;
    const match = priceStr.match(/([\d,]+)/);
    return match ? Number(match[1].replace(/,/g, "")) : 0;
  }

  // Filtering logic
  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(search.toLowerCase()));
    const priceNum = getPriceNumber(p.price);
    const matchesMin = min === "" || priceNum >= Number(min);
    const matchesMax = max === "" || priceNum <= Number(max);
    const matchesLocation = !location || p.location === location;
    const matchesCategory = !category || p.category === category;
    const matchesVerified =
      !verified ||
      (verified === "true" && p.verified) ||
      (verified === "false" && !p.verified);
    return (
      matchesSearch &&
      matchesMin &&
      matchesMax &&
      matchesLocation &&
      matchesCategory &&
      matchesVerified
    );
  });

  function getPriceParts(priceStr) {
    if (!priceStr) return { amount: 0, period: "" };
    const match = priceStr.match(/([\d,]+)/);
    const periodMatch = priceStr.match(/\/(year|month|week|day)/i);
    const amount = match ? Number(match[1].replace(/,/g, "")) : 0;
    const period = periodMatch ? `/${periodMatch[1]}` : "";
    return { amount, period };
  }

  // Utility: select dropdown with icon
  function SelectWithIcon({ value, onChange, children, className = "" }) {
    return (
      <div className={`relative min-w-[100px] max-w-[220px] w-full`}>
        <select
          value={value}
          onChange={onChange}
          className={
            "border rounded px-3 pr-10 py-2 w-full appearance-none whitespace-nowrap truncate overflow-hidden " +
            className
          }
        >
          {children}
        </select>
        <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-primary">Browse Properties</h1>

      <form className="flex flex-wrap gap-4 mb-8 items-end">
        <input
          type="search"
          className="border rounded px-2 py-2 flex-1 min-w-[200px]"
          placeholder=" Title, description, location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Location</label>
          <SelectWithIcon value={location} onChange={e => setLocation(e.target.value)}>
            <option value="">All</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </SelectWithIcon>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
          <SelectWithIcon value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </SelectWithIcon>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Verified</label>
          <SelectWithIcon value={verified} onChange={e => setVerified(e.target.value)} className="min-w-[100px] max-w-[140px]">
            <option value="">All</option>
            <option value="true">Verified</option>
            <option value="false">Not Verified</option>
          </SelectWithIcon>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Min Price</label>
          <SelectWithIcon value={min} onChange={e => setMin(e.target.value)} className="w-28">
            <option value="">Min</option>
            {prices.map((price) => (
              <option key={price} value={price}>
                ₦{price.toLocaleString()}
              </option>
            ))}
          </SelectWithIcon>
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1">Max Price</label>
          <SelectWithIcon value={max} onChange={e => setMax(e.target.value)} className="w-28">
            <option value="">Max</option>
            {prices.map((price) => (
              <option key={price} value={price}>
                ₦{price.toLocaleString()}
              </option>
            ))}
          </SelectWithIcon>
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
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer border border-gray-100"
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
                  <div className="flex flex-wrap gap-1 mt-3 mb-1">
                    {propBadge("Type", property.type || "N/A")}
                    {propBadge("Toilet", property.toilet || "N/A")}
                    {propBadge("Electricity", property.electricity || "N/A")}
                    {propBadge("Water", property.water || "N/A")}
                  </div>
                  {property.verified && (
                    <span className="inline-block mt-2 text-xs bg-red-600 text-white px-2 py-1 rounded font-bold">
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