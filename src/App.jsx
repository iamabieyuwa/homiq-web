import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import PropertyDetails from "./components/PropertyDetails";
import AgentLogin from "./components/pages/AgentLogin";
import Layout from "./Layout";
function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/property/:id" element={<PropertyDetails />} />

      <Route path="/agents/login" element={<AgentLogin />} />
    </Route>
  </Routes>
  );
}

export default App;
