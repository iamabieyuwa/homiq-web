import { useState } from "react";
import { Link } from "react-router-dom";
import propertiesData from "../../data/properties";
import AddListingModal from "../AddListingModal";
import { FaCheckCircle, FaTag, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

const AgentDashboard = () => {
  // In a real app, you'd get this from auth
  const agentId = 1;
  const [properties, setProperties] = useState(propertiesData);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  // Listings for this agent
  const myListings = properties.filter((p) => p.agentId === agentId);

  // Add new listing callback
  const handleAddListing = (newListing) => {
    setProperties((prev) => [
      ...prev,
      {
        ...newListing,
        id: prev.length + 1,
        images: newListing.images.filter(Boolean),
        sold: false,
        agentId,
      },
    ]);
  };

  // Delete listing
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Mark as Sold/Available
  const handleToggleSold = (id) => {
    setProperties((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, sold: !p.sold } : p
      )
    );
  };

  // Edit
  const handleEditClick = (listing) => {
    setEditId(listing.id);
    setEditForm({
      ...listing,
      images: listing.images?.[0] || "",
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditImageChange = (e) => {
    setEditForm((prev) => ({
      ...prev,
      images: e.target.value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setProperties((prev) =>
      prev.map((p) =>
        p.id === editId
          ? {
              ...p,
              ...editForm,
              images: [editForm.images],
            }
          : p
      )
    );
    setEditId(null);
    setEditForm(null);
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditForm(null);
  };

  return (
    <section className="px-2 py-6 md:px-4 md:py-10 bg-white dark:bg-black text-black dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-center sm:text-left w-full sm:w-auto">My Listings</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:opacity-90 transition w-full sm:w-auto"
          >
            + Add New Listing
          </button>
        </div>
        <AddListingModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddListing}
        />

        {myListings.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">No listings yet.</div>
        ) : (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {myListings.map((listing) =>
              editId === listing.id ? (
                <div
                  key={listing.id}
                  className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg shadow-md overflow-hidden transition relative"
                >
                  <form onSubmit={handleEditSubmit} className="p-4 space-y-2">
                    <input
                      className="w-full border px-3 py-2 rounded"
                      name="title"
                      placeholder="Title"
                      value={editForm.title}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      className="w-full border px-3 py-2 rounded"
                      name="location"
                      placeholder="Location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      className="w-full border px-3 py-2 rounded"
                      name="price"
                      placeholder="Price"
                      value={editForm.price}
                      onChange={handleEditChange}
                      required
                    />
                    <input
                      className="w-full border px-3 py-2 rounded"
                      name="category"
                      placeholder="Category"
                      value={editForm.category}
                      onChange={handleEditChange}
                    />
                    <input
                      className="w-full border px-3 py-2 rounded"
                      name="images"
                      placeholder="Image URL"
                      value={editForm.images}
                      onChange={handleEditImageChange}
                    />
                    <input
                      className="w-full border px-3 py-2 rounded"
                      name="contact"
                      placeholder="Contact"
                      value={editForm.contact}
                      onChange={handleEditChange}
                    />
                    <textarea
                      className="w-full border px-3 py-2 rounded"
                      name="description"
                      placeholder="Description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      rows={2}
                    />
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="verified"
                        checked={editForm.verified}
                        onChange={handleEditChange}
                      />
                      Verified
                    </label>
                    <div className="flex flex-col xs:flex-row gap-2 mt-2">
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-1 rounded flex items-center gap-2 justify-center"
                      >
                        <FaCheck /> Save
                      </button>
                      <button
                        type="button"
                        onClick={handleEditCancel}
                        className="bg-gray-500 text-white px-4 py-1 rounded flex items-center gap-2 justify-center"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div
                  key={listing.id}
                  className="bg-white dark:bg-black border border-black/10 dark:border-white/10 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition relative flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={listing.images && listing.images[0]}
                      alt={listing.title}
                      className="w-full h-44 sm:h-48 object-cover"
                    />
                    {listing.sold && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Sold
                      </div>
                    )}
                  </div>
                  <div className="p-4 space-y-2 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold">{listing.title}</h3>
                    <p className="text-primary font-bold">{listing.price}</p>
                    <p className="text-sm">{listing.location}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="inline-flex items-center gap-1 text-xs bg-primary text-white px-2 py-1 rounded">
                        <FaTag size={12} />
                        {listing.category}
                      </span>
                      {listing.verified && (
                        <span className="inline-flex items-center gap-1 text-xs bg-green-600 text-white px-2 py-1 rounded">
                          <FaCheckCircle size={12} />
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <button
                        title="Edit"
                        onClick={() => handleEditClick(listing)}
                        className="text-blue-500 hover:text-blue-800 flex items-center gap-1"
                      >
                        <FaEdit /> <span className="hidden xs:inline">Edit</span>
                      </button>
                      <button
                        title="Delete"
                        onClick={() => handleDelete(listing.id)}
                        className="text-red-500 hover:text-red-800 flex items-center gap-1"
                      >
                        <FaTrash /> <span className="hidden xs:inline">Delete</span>
                      </button>
                      <button
                        title={listing.sold ? "Mark as Available" : "Mark as Sold"}
                        onClick={() => handleToggleSold(listing.id)}
                        className={`flex items-center gap-1 ${
                          listing.sold
                            ? "text-yellow-600 hover:text-yellow-900"
                            : "text-green-600 hover:text-green-900"
                        }`}
                      >
                        <FaCheck />
                        <span className="hidden xs:inline">
                          {listing.sold ? "Mark as Available" : "Mark as Sold"}
                        </span>
                      </button>
                      <Link
                        to={`/property/${listing.id}`}
                        className="text-primary underline ml-auto block"
                      >
                        View
                      </Link>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AgentDashboard;