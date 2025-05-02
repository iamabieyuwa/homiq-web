// src/pages/AgentLogin.jsx

const AgentLogin = () => {
    return (
      <section className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white dark:bg-black shadow-md rounded-lg p-8 border border-black/10 dark:border-white/10">
          <h2 className="text-2xl font-bold text-center mb-6 text-black dark:text-white">
            Agent Login
          </h2>
  
          <form className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="agent@example.com"
                className="w-full px-4 py-2 border border-black/20 dark:border-white/20 rounded bg-white dark:bg-black text-black dark:text-white"
                required
              />
            </div>
  
            <div>
              <label className="block text-sm mb-1 text-black dark:text-white">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                className="w-full px-4 py-2 border border-black/20 dark:border-white/20 rounded bg-white dark:bg-black text-black dark:text-white"
                required
              />
            </div>
  
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded font-semibold hover:opacity-90 transition"
            >
              Login
            </button>
          </form>
        </div>
      </section>
    );
  };
  
  export default AgentLogin;
  