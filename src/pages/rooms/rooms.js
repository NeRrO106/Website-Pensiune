import React, { useState, useEffect } from 'react';
import './rooms.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const getAllRooms = async () => {
    const roomsRef = collection(db, "rooms");
    const allRoomsSnapshot = await getDocs(roomsRef);
    const allRooms = allRoomsSnapshot.docs.map(room => room.data());
    
    return allRooms;
  };

const Rooms = () =>{

    const [room, setRoom] = useState([]);
    useEffect(()=>{
        const fetchAllRooms = async ()=>{
            try{
                const rooms = await getAllRooms();
                setRoom(rooms);
            }
            catch(error){
                console.error("Eroare la incarcarea paginilor", error);
            }
        };
        fetchAllRooms();
    });

    return(
        <div className='main'>
            <h1>Camerele noastre</h1>
            <div className='roomList'>
                {room.length > 0 ? (
                    room.map(room =>(
                        <div key={room.room_id} className="room-card">
                            <img src={room.image} alt={room.name} className="room-image" />
                            <div className="room-details">
                                <h5 className="room-title">{room.name}</h5>
                                <p className="room-text">Preț: {room.price} RON/noapte</p>
                                <p className="room-text">Capacitate: {room.capacity} persoane</p>
                                <p className="room-text">{room.amenities.join(', ')}</p>
                                <button className="room-button">Vezi camera</button>
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
export default Rooms;