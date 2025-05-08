import { useAuth } from "../../context/AuthContext";
import { useState, useRef } from "react";

function getAgentListings(agentId) {
  const all = JSON.parse(localStorage.getItem("agentListings") || "{}");
  return all[agentId] || [];
}
function saveAgentListings(agentId, listings) {
  const all = JSON.parse(localStorage.getItem("agentListings") || "{}");
  all[agentId] = listings;
  localStorage.setItem("agentListings", JSON.stringify(all));
}

const initialForm = {
  title: "",
  price: "",
  description: "",
  image: "",
};

export default function AgentListings() {
  const { agent } = useAuth();
  const [listings, setListings] = useState(getAgentListings(agent.email));
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef();

  function handleFormChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setError("");
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, image: reader.result }));
    };
    reader.readAsDataURL(file);
  }

  function handleAddOrEditListing(e) {
    e.preventDefault();
    if (!form.title || !form.price || !form.description || !form.image) {
      setError("Fill all fields and upload an image!");
      return;
    }
    let updated;
    if (editIndex === null) {
      updated = [...listings, { ...form, id: Date.now() }];
    } else {
      updated = listings.map((l, idx) => (idx === editIndex ? { ...form, id: l.id } : l));
    }
    setListings(updated);
    saveAgentListings(agent.email, updated);
    setForm(initialForm);
    setEditIndex(null);
    setShowForm(false);
  }

  function handleDelete(idx) {
    if (!window.confirm("Delete this listing?")) return;
    const updated = listings.filter((_, i) => i !== idx);
    setListings(updated);
    saveAgentListings(agent.email, updated);
  }

  function handleEdit(idx) {
    setForm(listings[idx]);
    setEditIndex(idx);
    setShowForm(true);
    setError("");
  }

  function handleAdd() {
    setForm(initialForm);
    setEditIndex(null);
    setShowForm(true);
    setError("");
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 dark:from-black dark:to-black px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">My Listings</h2>
          <button
            className="bg-primary text-white font-semibold py-2 px-5 rounded shadow hover:bg-primary/90 transition"
            onClick={handleAdd}
          >
            + Add Listing
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={handleAddOrEditListing}
            className="bg-white dark:bg-black rounded-xl shadow-lg p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <label className="block mb-1 font-semibold">Title</label>
              <input
                className="w-full border px-3 py-2 rounded mb-2"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                required
              />
              <label className="block mb-1 font-semibold">Price</label>
              <input
                className="w-full border px-3 py-2 rounded mb-2"
                name="price"
                type="number"
                value={form.price}
                onChange={handleFormChange}
                required
              />
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                className="w-full border px-3 py-2 rounded mb-2"
                name="description"
                value={form.description}
                onChange={handleFormChange}
                required
                rows={4}
              />
            </div>
            <div className="flex flex-col items-center gap-3">
              <label className="block mb-1 font-semibold">Image</label>
              {form.image ? (
                <img
                  src={form.image}
                  alt="Listing"
                  className="w-48 h-48 object-cover rounded-lg border mb-2"
                />
              ) : (
                <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 border mb-2">
                  No image
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <button
                type="button"
                className="bg-black text-white px-4 py-1 rounded"
                onClick={() => fileInputRef.current.click()}
              >
                {form.image ? "Change" : "Upload"}
              </button>
              {form.image && (
                <button
                  type="button"
                  className="text-xs text-red-600 underline"
                  onClick={() => setForm(f => ({ ...f, image: "" }))}
                >
                  Remove Image
                </button>
              )}
              <button
                type="submit"
                className="mt-4 bg-primary text-white px-6 py-2 rounded shadow hover:bg-primary/90"
              >
                {editIndex === null ? "Add Listing" : "Save Changes"}
              </button>
              <button
                type="button"
                className="text-xs text-gray-600 underline mt-2"
                onClick={() => {
                  setShowForm(false);
                  setEditIndex(null);
                  setForm(initialForm);
                }}
              >
                Cancel
              </button>
              {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
            </div>
          </form>
        )}

        {/* Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {listings.length === 0 ? (
            <div className="col-span-full text-center text-gray-600 py-24">
              No listings yet.
            </div>
          ) : (
            listings.map((listing, idx) => (
              <div
                key={listing.id}
                className="bg-white dark:bg-black rounded-xl shadow-lg overflow-hidden flex flex-col"
              >
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 text-primary">{listing.title}</h3>
                  <div className="text-gray-700 mb-1 font-semibold">
                    ${Number(listing.price).toLocaleString()}
                  </div>
                  <div className="text-gray-600 flex-1 mb-2">{listing.description}</div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleEdit(idx)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}