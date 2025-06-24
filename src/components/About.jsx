import { FaHome, FaUsers, FaHandshake, FaHeart, FaShieldAlt, FaRocket, FaGlobeAfrica, FaAward } from "react-icons/fa";

const team = [
  {
    name: "Amara Okafor",
    role: "Founder & CEO",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Tunde Adebayo",
    role: "CTO",
    img: "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    name: "Ngozi Nwosu",
    role: "Head of Customer Experience",
    img: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    name: "David Essien",
    role: "Lead Backend Engineer",
    img: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    name: "Blessing Eze",
    role: "Product Manager",
    img: "https://randomuser.me/api/portraits/women/26.jpg",
  },
  {
    name: "Chidi Umeh",
    role: "Frontend Developer",
    img: "https://randomuser.me/api/portraits/men/56.jpg",
  },
  {
    name: "Fatima Sule",
    role: "UI/UX Designer",
    img: "https://randomuser.me/api/portraits/women/42.jpg",
  },
  {
    name: "Moses Ogundele",
    role: "Marketing Lead",
    img: "https://randomuser.me/api/portraits/men/37.jpg",
  },
];

const stats = [
  { label: "Active Listings", value: "5,200+" },
  { label: "Registered Agents", value: "1,000+" },
  { label: "Happy Clients", value: "10,000+" },
  { label: "Cities Covered", value: "35+" },
];

export default function About() {
  return (
    <section className="bg-white min-h-screen px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-primary mb-3">About Homiq</h1>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Homiq is Nigeria’s most trusted real estate platform, connecting families, professionals, and investors to their ideal properties. Whether you’re buying, renting, or listing, our mission is to deliver transparency, safety, and ease in every transaction.
          </p>
        </div>

        {/* Platform Stats */}
        <div className="flex flex-wrap justify-center gap-7 mb-14">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center bg-primary/10 px-8 py-4 rounded-xl min-w-[150px]">
              <span className="text-2xl font-bold text-primary">{stat.value}</span>
              <span className="text-gray-700 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center mb-16">
          <div className="flex flex-col items-center gap-2">
            <FaHome className="text-3xl text-primary" />
            <span className="font-bold">All Property Types</span>
            <span className="text-gray-600 text-sm">Flats, duplexes, bungalows, offices, and more.</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaUsers className="text-3xl text-primary" />
            <span className="font-bold">Verified Agents & Listings</span>
            <span className="text-gray-600 text-sm">Every agent and property is carefully screened to prevent scams.</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaHandshake className="text-3xl text-primary" />
            <span className="font-bold">Secure Transactions</span>
            <span className="text-gray-600 text-sm">End-to-end encrypted messaging, verified payments, and legal support.</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaHeart className="text-3xl text-primary" />
            <span className="font-bold">Customer-First Support</span>
            <span className="text-gray-600 text-sm">Our support team is available 24/7 to guide and assist you.</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaShieldAlt className="text-3xl text-primary" />
            <span className="font-bold">Data Privacy</span>
            <span className="text-gray-600 text-sm">We guarantee the highest standard of data protection for all users.</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaRocket className="text-3xl text-primary" />
            <span className="font-bold">Fast Search & Filters</span>
            <span className="text-gray-600 text-sm">Instantly filter properties by price, location, features, and more.</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaGlobeAfrica className="text-3xl text-primary" />
            <span className="font-bold">Nationwide Coverage</span>
            <span className="text-gray-600 text-sm">Access listings from Lagos, Abuja, Port Harcourt, and 30+ cities.</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaAward className="text-3xl text-primary" />
            <span className="font-bold">Award-Winning Service</span>
            <span className="text-gray-600 text-sm">Recognized for innovation, security, and customer satisfaction.</span>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-primary mb-5 text-center">Our Story</h2>
          <p className="text-gray-700 text-base leading-relaxed text-center">
            Homiq was founded out of a passion to solve the challenges Nigerians face when searching for property. What started as a small team in 2018 has grown into a nationwide platform with thousands of listings and a vibrant community of users and real estate professionals.<br /><br />
            We believe everyone deserves a safe, simple, and enjoyable real estate experience. Every feature we build is inspired by feedback from our users and a relentless drive to make property search and management easier for all.
          </p>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Meet The Team</h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {team.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center bg-white shadow rounded-lg p-6 w-56">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-primary"
                />
                <span className="font-semibold text-lg">{member.name}</span>
                <span className="text-primary text-sm">{member.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-primary/10 p-6 rounded-lg max-w-xs">
              <p className="text-gray-800 italic mb-3">“I found my current apartment through Homiq. The process was smooth and the agent was trustworthy.”</p>
              <div className="font-semibold text-primary">— Ifeoma, Lagos</div>
            </div>
            <div className="bg-primary/10 p-6 rounded-lg max-w-xs">
              <p className="text-gray-800 italic mb-3">“I appreciate the quick support and easy-to-use filters. Searching for a house in Abuja was actually fun!”</p>
              <div className="font-semibold text-primary">— Samuel, Abuja</div>
            </div>
            <div className="bg-primary/10 p-6 rounded-lg max-w-xs">
              <p className="text-gray-800 italic mb-3">“No more fake listings! I only use Homiq now to rent and recommend it to all my friends.”</p>
              <div className="font-semibold text-primary">— Fatima, Port Harcourt</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold mb-2">Ready to find your next home?</h3>
          <a
            href="/"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
          >
            Browse Properties
          </a>
        </div>
      </div>
    </section>
  );
}