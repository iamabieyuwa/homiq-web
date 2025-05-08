import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import PropertyDetails from "./components/PropertyDetails";
import Properties from "./components/Properties";
import AgentSignup from "./components/pages/AgentSignup";
import AgentLogin from "./components/pages/AgentLogin";
import AgentDashboard from './components/pages/AgentDashboard';
import AgentProfileEdit from "./components/pages/AgentProfileEdit";
import AgentListings from "./components/pages/AgentListings";
import Layout from "./Layout";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import Agents from "./components/pages/Agents";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="agents/login" element={<AgentLogin />} />
          <Route path="agent/signup" element={<AgentSignup />} />
          <Route path="agents" element={<Agents />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="properties" element={<Properties />} />
          <Route
            path="agent/dashboard"
            element={
              <ProtectedRoute>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
  path="agent/edit-profile"
  element={
    <ProtectedRoute>
      <AgentProfileEdit />
    </ProtectedRoute>
  }
/>
<Route
  path="agent/listings"
  element={
    <ProtectedRoute>
      <AgentListings />
    </ProtectedRoute>
  }
/>
          {/* Catch-all: redirect unknown routes to home or login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;