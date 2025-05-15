import { useState, useEffect } from "react";

// Use real image links here. Replace these with actual agent image URLs as needed.
const mockAgents = [
  {
    id: 1,
    fullName: "Agent Demo",
    email: "agent1@homiq.com",
    profilePicture: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "+234 801 234 5678",
  },
  {
    id: 2,
    fullName: "Jane Doe",
    email: "jane.doe@homiq.com",
    profilePicture: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "+234 802 345 6789",
  },
  {
    id: 3,
    fullName: "John Smith",
    email: "john.smith@homiq.com",
    profilePicture: "https://randomuser.me/api/portraits/men/78.jpg",
    phone: "+234 803 456 7890",
  },
];

export default function Agents() {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Simulate fetching agents from an API
    setTimeout(() => {
      setAgents(mockAgents);
    }, 500);
  }, []);

  return (
    <section className="min-h-screen bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          Meet Our Agents
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 flex flex-col items-center text-center border border-gray-200 dark:border-gray-700"
            >
              <img
                src={agent.profilePicture}
                alt={agent.fullName}
                className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-red-600"
              />
              <h2 className="text-lg font-semibold text-black dark:text-white">
                {agent.fullName}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {agent.email}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {agent.phone}
              </p>
              <button
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full text-xs hover:bg-red-700 transition"
                onClick={() => alert(`Contact ${agent.fullName}`)}
              >
                View Listings
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}