import { React, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import checkAvailableRoom from '../../availableRooms';
import "./freeRooms.css";

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

    const reservation = async (roomId, startDate, endDate, guest) => {
        try {
            const reservationRef = collection(db, "reservations");
            await addDoc(reservationRef, {
                roomId: roomId,
                checkIn: resetTime(startDate),
                checkOut: resetTime(endDate),
                guest: guest
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
                        <div key={room.room_id} className="card">
                            <img src={room.image} alt={room.name} className="card-img-top"/>
                            <div className="card-body">
                                <h5 className="card-title">{room.name}</h5>
                                <p className="card-text">Preț: {room.price} RON/noapte</p>
                                <p className="card-text">Capacitate: {room.capacity} persoane</p>
                                <p className="card-text">{room.amenities.join(', ')}</p>
                                <button 
                                    className='custom-button'
                                    onClick={()=>reservation(room.room_id, startDate, endDate, room.capacity)}
                                >Rezervă această cameră</button>
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