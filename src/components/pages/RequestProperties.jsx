import { useState } from "react";

export default function RequestProperty() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: "",
    location: "",
    budget: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Here you would normally send the form data to the backend API.
    setSubmitted(true);
    setForm({
      name: "",
      email: "",
      phone: "",
      type: "",
      location: "",
      budget: "",
      description: "",
    });
  }

  return (
    <section className="min-h-screen bg-white flex items-center justify-center px-2 py-8 sm:py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border p-4 sm:p-8 mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-primary text-center">Request a Property or Give Feedback</h1>
        <p className="text-gray-700 mb-6 text-center text-base sm:text-lg">
          Looking for something specific or have feedback for us?  
          Fill out the form below and our team or trusted agents will get in touch with you!
        </p>

        {submitted ? (
          <div className="bg-green-100 border border-green-300 text-green-800 rounded p-4 text-center">
            Thank you for your request! We will contact you soon.
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-1">Your Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-base"
                required
                autoComplete="name"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-base"
                  required
                  autoComplete="email"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-base"
                  required
                  autoComplete="tel"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Type of Property</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-base"
                required
              >
                <option value="">Select type</option>
                <option value="Apartment">Apartment / Flat</option>
                <option value="Duplex">Duplex</option>
                <option value="Self-contained">Self-contained</option>
                <option value="Mini Flat">Mini Flat</option>
                <option value="Bungalow">Bungalow</option>
                <option value="Commercial">Commercial Space</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Preferred Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-base"
                  required
                  placeholder="e.g. Lekki, Abuja, Yaba"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold mb-1">Budget (₦ or range)</label>
                <input
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded text-base"
                  required
                  placeholder="e.g. 1,000,000/year"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Describe what you want <span className="text-gray-500">(or leave us feedback)</span>
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded text-base"
                rows={4}
                required
                placeholder="e.g. I want a 2-bedroom apartment with parking, close to a main road. Or: Your platform is great, but I wish you had more listings in Port Harcourt."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 rounded hover:opacity-90 transition text-base"
            >
              Submit Request
            </button>
          </form>
        )}
      </div>
    </section>
  );
}