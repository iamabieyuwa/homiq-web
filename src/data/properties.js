// Example property data for Homiq agent dashboard/demo (with enhanced descriptions)
const properties = [
  {
    id: 1,
    title: "2 Bedroom Flat in Ugbowo",
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80",
    ],
    price: "₦1,200,000/year",
    location: "Ugbowo, Benin City",
    description: "Spacious 2 bedroom flat with modern amenities, located close to UNIBEN and public transport.",
    verified: true,
    sold: false,
    category: "Flat",
    agentId: 1,
    contact: "08030000001",
    type: "Flat",
    toilet: "Yes",
    electricity: "Available",
    water: "Available",
    extra: "Fenced compound, tiled rooms, prepaid meter."
  },
  {
    id: 2,
    title: "Mini Flat in Sapele Road",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1424746219973-8fe3bd07d8e3?auto=format&fit=crop&w=400&q=80",
    ],
    price: "₦650,000/year",
    location: "Sapele Road, Benin City",
    description: "Affordable mini flat suitable for singles or young couples. Secure environment and steady water.",
    verified: false,
    sold: false,
    category: "Mini Flat",
    agentId: 1,
    contact: "08030000002",
    type: "Mini Flat",
    toilet: "Yes",
    electricity: "Not Available",
    water: "Available",
    extra: "Upstairs, balcony, 1 car parking space."
  },
  {
    id: 3,
    title: "Luxury Duplex in GRA",
    images: [
      "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?auto=format&fit=crop&w=400&q=80",
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&w=400&q=80",
    ],
    price: "₦7,500,000/year",
    location: "GRA, Benin City",
    description: "Fully serviced luxury duplex in a serene estate. 24/7 power, swimming pool, and gym included.",
    verified: true,
    sold: false,
    category: "Duplex",
    agentId: 2,
    contact: "08030000003",
    type: "Duplex",
    toilet: "Yes",
    electricity: "Available (24/7)",
    water: "Available (Borehole)",
    extra: "Swimming pool, gym, 4-car garage."
  },
  {
    id: 4,
    title: "Self-Contain at Uselu",
    images: [
      "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    ],
    price: "₦350,000/year",
    location: "Uselu, Benin City",
    description: "Compact self-contain with kitchen and bathroom, close to transport and market.",
    verified: false,
    sold: true,
    category: "Self-Contain",
    agentId: 1,
    contact: "08030000004",
    type: "Self-Contain",
    toilet: "Yes (Private)",
    electricity: "Not Available",
    water: "Not Available",
    extra: "Ground floor, single room, no generator allowed."
  },
  {
    id: 5,
    title: "3 Bedroom Bungalow at Ekosodin",
    images: [
      "https://images.unsplash.com/photo-1467987506553-8f3916508521?auto=format&fit=crop&w=400&q=80"
    ],
    price: "₦1,800,000/year",
    location: "Ekosodin, Benin City",
    description: "Spacious bungalow with fenced compound, 3 bedrooms, 3 bathrooms, and ample parking.",
    verified: true,
    sold: false,
    category: "Bungalow",
    agentId: 2,
    contact: "08030000005",
    type: "Bungalow",
    toilet: "Yes (3)",
    electricity: "Available (Prepaid)",
    water: "Available",
    extra: "Spacious compound, flower garden, security post."
  },
  {
    id: 6,
    title: "Student Hostel Room",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80"
    ],
    price: "₦200,000/year",
    location: "Ugbowo, Benin City",
    description: "Single room in a student hostel, shared amenities, close to UNIBEN campus.",
    verified: false,
    sold: false,
    category: "Hostel",
    agentId: 3,
    contact: "08030000006",
    type: "Hostel Room",
    toilet: "Shared",
    electricity: "Available",
    water: "Available",
    extra: "Shared kitchen, 24/7 security, generator."
  },
  {
    id: 7,
    title: "4 Bedroom Luxury Flat",
    images: [
      "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=400&q=80"
    ],
    price: "₦4,500,000/year",
    location: "Ihama, GRA, Benin City",
    description: "Luxury finishing, 4 bedrooms, 5 bathrooms, ACs in all rooms, standby generator. Ready to move in.",
    verified: true,
    sold: true,
    category: "Flat",
    agentId: 1,
    contact: "08030000007",
    type: "Flat",
    toilet: "Yes (5)",
    electricity: "Available (Standby Generator)",
    water: "Available",
    extra: "Fully air-conditioned, elevator, CCTV surveillance."
  }
];

export default properties;