import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const RoomsManager = () => {
  const [rooms, setRooms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newRoom, setNewRoom] = useState({
    name: "",
    price: "",
    capacity: "",
    amenities: "",
    image: "",
  });

  const fetchRooms = async () => {
    try {
      const roomsRef = collection(db, "rooms");
      const snapshot = await getDocs(roomsRef);
      const roomList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRooms(roomList);
    } catch (error) {
      console.error("Eroare la preluarea camerelor:", error);
    }
  };

  const handleChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleActionDemo = () => {
    window.confirm("În versiunea DEMO această funcție este dezactivată.");
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="font-serif text-2xl text-stone-900 font-light italic">
            Camere{" "}
            <span className="text-stone-400 font-sans not-italic text-sm tracking-[0.2em] uppercase ml-2">
              Gestiune Inventar
            </span>
          </h3>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 border ${
            showForm
              ? "border-stone-200 text-stone-400 hover:bg-stone-50"
              : "border-stone-900 bg-stone-900 text-white hover:bg-stone-800 shadow-lg shadow-stone-200"
          }`}
        >
          {showForm ? "Anulează" : "Adaugă Cameră Nouă"}
        </button>
      </div>

      {showForm && (
        <div className="bg-stone-50 p-8 rounded-sm border border-stone-100 animate-in fade-in slide-in-from-top-4 duration-500">
          <form
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleActionDemo();
            }}
          >
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 ml-1">
                Nume Cameră
              </label>
              <input
                className="w-full bg-white border border-stone-200 p-3 text-sm outline-none focus:border-stone-900 transition-colors"
                type="text"
                name="name"
                value={newRoom.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 ml-1">
                Preț / Noapte (RON)
              </label>
              <input
                className="w-full bg-white border border-stone-200 p-3 text-sm outline-none focus:border-stone-900 transition-colors"
                type="number"
                name="price"
                value={newRoom.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 ml-1">
                Capacitate (Pers.)
              </label>
              <input
                className="w-full bg-white border border-stone-200 p-3 text-sm outline-none focus:border-stone-900 transition-colors"
                type="number"
                name="capacity"
                value={newRoom.capacity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1 lg:col-span-2">
              <label className="text-[9px] uppercase tracking-widest text-stone-400 ml-1">
                Facilități (separate prin virgulă)
              </label>
              <input
                className="w-full bg-white border border-stone-200 p-3 text-sm outline-none focus:border-stone-900 transition-colors"
                type="text"
                name="amenities"
                placeholder="Wi-Fi, Balcon, Mic Dejun..."
                value={newRoom.amenities}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-stone-900 text-white py-3 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-stone-800 transition-colors"
              >
                Salvează Camera
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="grid grid-cols-1 gap-4">
        {rooms.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-stone-200">
            <p className="font-serif italic text-stone-400">
              Nu există camere înregistrate în baza de date.
            </p>
          </div>
        ) : (
          rooms.map((room) => (
            <div
              key={room.id}
              className="group bg-white border border-stone-100 p-4 flex flex-col md:flex-row items-center gap-6 hover:shadow-md transition-all duration-300"
            >
              <div className="w-full md:w-32 h-24 bg-stone-100 overflow-hidden">
                <img
                  src={room.image || "https://via.placeholder.com/150"}
                  alt={room.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="flex-1 space-y-1 text-center md:text-left">
                <h4 className="font-serif text-xl text-stone-900">
                  {room.name}
                </h4>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] uppercase tracking-widest text-stone-400">
                  <span>
                    Capacitate:{" "}
                    <b className="text-stone-600">{room.capacity} Pers.</b>
                  </span>
                  <span>
                    Preț: <b className="text-stone-600">{room.price} RON</b>
                  </span>
                </div>
                <p className="text-[11px] text-stone-400 italic truncate max-w-md">
                  {Array.isArray(room.amenities)
                    ? room.amenities.join(" • ")
                    : room.amenities}
                </p>
              </div>

              <div className="flex gap-2 w-full md:w-auto">
                <button
                  onClick={handleActionDemo}
                  className="flex-1 md:flex-none px-4 py-2 border border-stone-200 text-[9px] uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={handleActionDemo}
                  className="flex-1 md:flex-none px-4 py-2 text-[9px] uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors"
                >
                  Șterge
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RoomsManager;
