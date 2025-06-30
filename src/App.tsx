import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import {
  Home,
  Events,
  About,
  Contact,
  Giving,
  Ministries,
  Sermons,
} from "./pages";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/giving" element={<Giving />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/sermons" element={<Sermons />} />
          <Route path="/events" element={<Events />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
