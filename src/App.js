import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/home';
import Rooms from './pages/rooms/rooms';
import Galery from './pages/galery/galery';
import Partii from './pages/partii/partii';
import Spa from './pages/spa/spa';
import NavBar from './pages/navbar/navbar';
import RoomsAvailable from './pages/rooms/freeRooms';

function App() {
  return (
    <Router>
        <NavBar />
        <Routes>
          <Route path = "/" element = {<Home/>}/>
          <Route path = "/rooms" element = {<Rooms/>}/>
          <Route path = "/availablerooms" element = {<RoomsAvailable/>}/>
          <Route path = "/galery" element = {<Galery/>}/>
          <Route path = "/partii" element = {<Partii/>}/>
          <Route path = "/spa" element = {<Spa/>}/>
        </Routes>
    </Router>
  );
}

export default App;
