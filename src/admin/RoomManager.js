import React, { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const RoomsManager = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: '',
    price: '',
    capacity: '',
    amenities: '',
    image: '',
  });


  const fetchRooms = async () => {
    try {
      const roomsRef = collection(db, 'rooms');
      const snapshot = await getDocs(roomsRef);
      const roomList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRooms(roomList);
    } catch (error) {
      console.error('Eroare la preluarea camerelor:', error);
    }
  };

  const handleDelete = async (roomId) => {
    {/*const confirmDelete = window.confirm('Ești sigur că vrei să ștergi această cameră?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'rooms', roomId));
      fetchRooms();
    } catch (error) {
      console.error('Eroare la ștergerea camerei:', error);
    }*/}
    window.confirm('In versiunea DEMO butonul nu este functional');
  };
  const handleEdit = (roomId) => {
    {/*const roomToEdit = rooms.find(room => room.id === roomId);
    setNewRoom({
      name: roomToEdit.name,
      price: roomToEdit.price,
      capacity: roomToEdit.capacity,
      amenities: roomToEdit.amenities.join(', '),
      image: roomToEdit.image,
    });
    setShowForm(true);*/}
    window.confirm('In versiunea DEMO butonul nu este functional');
  }
  const handleChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };
  const handleAddRoom = async (e) => {
    {/*e.preventDefault();
    try {
      const roomData = {
        ...newRoom,
        price: parseFloat(newRoom.price),
        capacity: parseInt(newRoom.capacity),
        amenities: newRoom.amenities.split(',').map(item => item.trim())
      };
      await addDoc(collection(db, 'rooms'), roomData);
      setNewRoom({ name: '', price: '', capacity: '', amenities: '', image: '' });
      setShowForm(false);
      fetchRooms();
    } catch (error) {
      console.error('Eroare la adăugare cameră:', error);
    }*/}
    window.confirm('In versiunea DEMO butonul nu este functional');
  };


  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="rooms-manager">
      <h3>Camere disponibile</h3>
      <button onClick={() => setShowForm(!showForm)} className="btn-add">
        {showForm ? 'Anulează' : 'Adaugă cameră'}
      </button>

      {showForm && (
        <form className="add-room-form" onSubmit={handleAddRoom}>
          <input type="text" name="name" placeholder="Nume cameră" value={newRoom.name} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Preț/noapte" value={newRoom.price} onChange={handleChange} required />
          <input type="number" name="capacity" placeholder="Capacitate" value={newRoom.capacity} onChange={handleChange} required />
          <input type="text" name="amenities" placeholder="Facilități (virgule)" value={newRoom.amenities} onChange={handleChange} />
          <input type="text" name="image" placeholder="URL imagine" value={newRoom.image} onChange={handleChange} />
          <button type="submit" className="btn-save">Salvează</button>
        </form>
      )}
      {rooms.length === 0 ? (
        <p>Nu există camere înregistrate.</p>
      ) : (
        <table className="room-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Capacitate</th>
              <th>Preț</th>
              <th>Facilități</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map(room => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.capacity}</td>
                <td>{room.price} RON</td>
                <td>{room.amenities?.join(', ')}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(room.id)}>Editează</button>
                  <button className="btn-delete" onClick={() => handleDelete(room.id)}>Șterge</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
    </div>
  );
};

export default RoomsManager;
