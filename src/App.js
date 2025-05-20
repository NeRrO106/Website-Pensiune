import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Rooms from './pages/rooms/rooms';
import Galery from './pages/galery/galery';
import Restaurant from './pages/restaurant/restaurant';
import Partii from './pages/partii/partii';
import Spa from './pages/spa/spa';
import NavBar from './pages/navbar/navbar';
import RoomsAvailable from './pages/rooms/freeRooms';
import AdminPanel from '../src/admin/AdminPanel';
import Footer from './pages/footer';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path = "/" element = {<Home/>}/>
            <Route path = "/rooms" element = {<Rooms/>}/>
            <Route path = "/availablerooms" element = {<RoomsAvailable/>}/>
            <Route path = "/restaurant" element = {<Restaurant/>}/>
            <Route path = "/galery" element = {<Galery/>}/>
            <Route path = "/partii" element = {<Partii/>}/>
            <Route path = "/spa" element = {<Spa/>}/>
            <Route path = "/admin" element={<AdminPanel/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
