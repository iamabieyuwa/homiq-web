import { useState } from "react";

const initialForm = {
  title: "",
  location: "",
  price: "",
  category: "",
  images: [""],
  description: "",
  contact: "",
  verified: false,
};

export default function AddListingModal({ open, onClose, onAdd }) {
  const [form, setForm] = useState(initialForm);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setForm((prev) => ({
      ...prev,
      images: [e.target.value],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.location) {
      alert("Title, Price, and Location are required!");
      return;
    }
    onAdd(form);
    setForm(initialForm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-black dark:hover:text-white"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border px-3 py-2 rounded"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded"
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded"
            name="price"
            placeholder="Price (e.g. ₦1,000,000/year)"
            value={form.price}
            onChange={handleChange}
            required
          />
          <input
            className="w-full border px-3 py-2 rounded"
            name="category"
            placeholder="Category (e.g. Flat, Duplex)"
            value={form.category}
            onChange={handleChange}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            name="images"
            placeholder="Image URL"
            value={form.images[0]}
            onChange={handleImageChange}
          />
          <input
            className="w-full border px-3 py-2 rounded"
            name="contact"
            placeholder="Contact (e.g. 08030000000)"
            value={form.contact}
            onChange={handleChange}
            required
          />
          <textarea
            className="w-full border px-3 py-2 rounded"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="verified"
              checked={form.verified}
              onChange={handleChange}
            />
            Verified
          </label>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold mt-2"
          >
            Add Listing
          </button>
        </form>
      </div>
    </div>
  );
}