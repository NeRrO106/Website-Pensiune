import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);

  const fetchRooms = async () => {
    try {
      const roomsRef = collection(db, 'reservations');
      const snapshot = await getDocs(roomsRef);
      const roomList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReservations(roomList);
    } catch (error) {
      console.error('Eroare la preluarea camerelor:', error);
    }
  };

  const handleDelete = async (roomId) => {
    {/*const confirmDelete = window.confirm('Ești sigur că vrei să ștergi această rezervare?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'reservations', roomId));
      fetchRooms();
    } catch (error) {
      console.error('Eroare la ștergerea camerei:', error);
    }*/}
    window.confirm('In versiunea DEMO butonul nu este functional');
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="rooms-manager">
      <h3>Rezervări înregistrate</h3>
      {reservations.length === 0 ? (
        <p>Nu există rezervări.</p>
      ) : (
        <table className="room-table">
          <thead>
            <tr>
              <th>Cam. ID</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Nr. persoane</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id}>
                <td>{res.roomId}</td>
                <td>{new Date(res.checkIn.seconds * 1000).toLocaleDateString()}</td>
                <td>{new Date(res.checkOut.seconds * 1000).toLocaleDateString()}</td>
                <td>{res.guest}</td>
                <td>
                  <button className="btn-delete" onClick={() => handleDelete(res.id)}>Șterge</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationsList;
