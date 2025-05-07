import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import checkAvailableRoom from '../../availableRooms';
import "./freeRooms.scss";

const resetTime = (date) => {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate;
};
const getAvailableRooms = async (startDate, endDate, capacity) => {
    const reservedRooms = await checkAvailableRoom(resetTime(startDate), resetTime(endDate));

    const roomsRef = collection(db, "rooms");
    const allRoomsSnapshot = await getDocs(roomsRef);

    const availableRooms = allRoomsSnapshot.docs
    .filter(room =>{
        const roomData = room.data();
        return !reservedRooms.includes(roomData.room_id) && roomData.capacity >= capacity;
    })
    .map(room => room.data());

    return availableRooms;
};
  

const RoomsAvailable = () =>{

    const location = useLocation();
    const [availableRooms, setAvailableRooms] = useState([]);
    const { startDate, endDate, capacity } = location.state || {};

    const [activeFormRoomId, setActiveFormRoomId] = useState(null);
    const [name, setName] = useState('');
    const [telefon, setTelefon] = useState('');

    useEffect(()=>{
        const fetchAvailableRooms = async ()=>{
            try{
                const rooms = await getAvailableRooms(startDate, endDate, capacity);
                setAvailableRooms(rooms);
            }
            catch(error){
                console.error('Eroare la verificarea camerelor disponibile: ', error);
            }
        };
        fetchAvailableRooms();
    }, [startDate, endDate, capacity]);

    const reservation = async (roomId, startDate, endDate, guest,name,telefon) => {
        try {
            const reservationRef = collection(db, "reservations");
            await addDoc(reservationRef, {
                roomId: roomId,
                checkIn: resetTime(startDate),
                checkOut: resetTime(endDate),
                guest: guest,
                name: name,
                telefon: telefon
            });
            const updatedRooms = await getAvailableRooms(startDate, endDate, guest);
            setAvailableRooms(updatedRooms);
        } catch (error) {
            console.error("Eroare la rezervare:", error);
        }
    };

    return(
        <div className='main'>
            <h2>Camere disponibile</h2>
            <div className='roomList'>
                {availableRooms.length > 0 ? (
                    availableRooms.map(room =>(
                        <div key={room.name} className="room-card">
                            <img src={room.image} alt={room.name} className="room-image" />
                            <div className="room-details" style={{ marginBottom: activeFormRoomId === room.room_id ? "20px" : "0" }}>
                                <h5 className="room-title">{room.name}</h5>
                                <p className="room-text">Preț: {room.price} RON/noapte</p>
                                <p className="room-text">Capacitate: {room.capacity} persoane</p>
                                <p className="room-text">{room.amenities.join(', ')}</p>
                                <button
                                    className="room-button"
                                    onClick={() => setActiveFormRoomId(room.room_id === activeFormRoomId ? null : room.room_id)}
                                >
                                    {activeFormRoomId === room.room_id ? 'Anulează' : 'Fă o rezervare'}
                                </button>
                                {activeFormRoomId === room.room_id && (
                                    <form className="add-room-form"   onSubmit={(e) => {
                                        e.preventDefault();
                                        reservation(room.room_id, startDate, endDate, room.capacity, name, telefon);
                                    }}>
                                        <input type="text" name="name" placeholder="Nume" value={name} onChange={(e) => setName(e.target.value)} />
                                        <input type="text" name="telefon" placeholder="Telefon" value={telefon} onChange={(e) => setTelefon(e.target.value)} />
                                        <button type="submit" className="btn-save">Rezervă</button>
                                    </form>
                                )}
                            </div>
                        </div>
                    ))
                ):(
                    <p>Nicio cameră nu este disponibilă în această perioadă.</p>
                )}
            </div>
        </div>
    );

}
export default RoomsAvailable;