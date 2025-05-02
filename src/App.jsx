import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import PropertyDetails from "./components/PropertyDetails";
import Layout from "./Layout";
function App() {
  return (
    <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/property/:id" element={<PropertyDetails />} />
    </Route>
  </Routes>
  );
}

export default App;
