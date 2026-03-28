import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Rooms from "./pages/rooms/rooms";
import Galery from "./pages/galery/galery";
import Restaurant from "./pages/restaurant/restaurant";
import NavBar from "./pages/navbar/navbar";
import RoomsAvailable from "./pages/rooms/freeRooms";
import AdminPanel from "./admin/AdminPanel";
import Footer from "./footer/footer";

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/availablerooms" element={<RoomsAvailable />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/galery" element={<Galery />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
