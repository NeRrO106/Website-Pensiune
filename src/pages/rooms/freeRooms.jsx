import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import checkAvailableRoom from "../../availableRooms";

const resetTime = (date) => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const RoomsAvailable = () => {
  const location = useLocation();
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { startDate, endDate, capacity } = location.state || {};

  const [activeFormRoomId, setActiveFormRoomId] = useState(null);
  const [name, setName] = useState("");
  const [telefon, setTelefon] = useState("");
  const [reservedRoomId, setReservedRoomId] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      if (!startDate || !endDate) return;
      try {
        const reservedIds = await checkAvailableRoom(
          resetTime(startDate),
          resetTime(endDate),
        );
        const roomsRef = collection(db, "rooms");
        const snapshot = await getDocs(roomsRef);

        const filtered = snapshot.docs
          .map((doc) => doc.data())
          .filter(
            (r) => !reservedIds.includes(r.room_id) && r.capacity >= capacity,
          );

        setAvailableRooms(filtered);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, [startDate, endDate, capacity]);

  const reservation = async (
    roomId,
    startDate,
    endDate,
    guest,
    name,
    telefon,
  ) => {
    const cleanName = name.trim();
    const cleanPhone = telefon.trim();

    if (cleanName.length < 3) {
      alert("Numele este prea scurt.");
      return;
    }

    const phoneRegex = /^(?:(?:\+|00)40|0)7[0-9]{8}$/;
    if (!phoneRegex.test(cleanPhone)) {
      alert("Numărul de telefon nu este valid.");
      return;
    }

    try {
      const currentReserved = await checkAvailableRoom(
        resetTime(startDate),
        resetTime(endDate),
      );
      if (currentReserved.includes(roomId)) {
        alert("Ne pare rău, această cameră tocmai a fost ocupată.");
        return;
      }

      await addDoc(collection(db, "reservations"), {
        roomId,
        checkIn: resetTime(startDate),
        checkOut: resetTime(endDate),
        guest: guest,
        name: cleanName,
        telefon: cleanPhone,
        createdAt: new Date(),
      });

      setReservedRoomId(roomId);
      setAvailableRooms((prev) => prev.filter((r) => r.room_id !== roomId));
    } catch (error) {
      alert("A apărut o eroare. Vă rugăm să încercați din nou.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-[1px] bg-stone-300 animate-pulse"></div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-stone-400">
          Căutăm disponibilitate
        </p>
      </div>
    );

  return (
    <section className="bg-[#FAF9F6] min-h-screen pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-20">
          <span className="text-[10px] tracking-[0.5em] uppercase text-stone-400 block mb-4">
            Rezervări Online
          </span>
          <h2 className="font-serif text-5xl md:text-6xl text-stone-900 mb-6 font-light">
            Camere{" "}
            <span className="italic text-stone-500 underline decoration-stone-200 underline-offset-8">
              Disponibile
            </span>
          </h2>
          <div className="inline-block border-t border-stone-200 pt-4 px-8 text-xs text-stone-500 tracking-widest uppercase">
            {new Date(startDate).toLocaleDateString("ro-RO")} —{" "}
            {new Date(endDate).toLocaleDateString("ro-RO")}
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {availableRooms.length > 0 ? (
            availableRooms.map((room) => (
              <div
                key={room.room_id}
                className="bg-white group transition-all duration-500 hover:shadow-2xl hover:shadow-stone-200/50"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 text-[11px] font-bold tracking-tighter text-stone-900">
                    {room.price} RON{" "}
                    <span className="font-light opacity-50">/ noapte</span>
                  </div>
                </div>

                <div className="p-8 text-center">
                  <h3 className="font-serif text-2xl text-stone-900 mb-2">
                    {room.name}
                  </h3>
                  <p className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-6">
                    Capacitate: {room.capacity} Persoane
                  </p>

                  {activeFormRoomId !== room.room_id ? (
                    <button
                      onClick={() => {
                        setActiveFormRoomId(room.room_id);
                        setReservedRoomId(null);
                        setName("");
                        setTelefon("");
                      }}
                      className="w-full py-4 border border-stone-200 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-stone-900 hover:text-white transition-all duration-300"
                    >
                      Selectează Camera
                    </button>
                  ) : (
                    <div className="animate-fadeIn">
                      {reservedRoomId === room.room_id ? (
                        <div className="py-4 text-green-700 text-xs tracking-widest uppercase font-bold bg-green-50">
                          Vă mulțumim pentru rezervare!
                        </div>
                      ) : (
                        <form
                          className="flex flex-col gap-4"
                          onSubmit={(e) => {
                            e.preventDefault();
                            reservation(
                              room.room_id,
                              startDate,
                              endDate,
                              room.capacity,
                              name,
                              telefon,
                            );
                          }}
                        >
                          <input
                            className="w-full border-b border-stone-200 py-2 text-sm outline-none focus:border-stone-900 transition-colors text-center"
                            placeholder="Numele dvs."
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          <input
                            className="w-full border-b border-stone-200 py-2 text-sm outline-none focus:border-stone-900 transition-colors text-center"
                            placeholder="+40 7XXXXXXXX"
                            type="tel"
                            required
                            value={telefon}
                            onChange={(e) => setTelefon(e.target.value)}
                          />
                          <div className="flex gap-2 mt-2">
                            <button
                              type="submit"
                              className="flex-1 bg-stone-900 text-white text-[10px] uppercase tracking-widest py-3"
                            >
                              Confirmă
                            </button>
                            <button
                              type="button"
                              onClick={() => setActiveFormRoomId(null)}
                              className="flex-1 border border-stone-200 text-[10px] uppercase tracking-widest py-3"
                            >
                              Anulează
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full border border-dashed border-stone-200 py-32 text-center">
              <p className="font-serif italic text-stone-400 text-xl">
                Nu am găsit nicio cameră disponibilă.
              </p>
              <button className="mt-6 text-[10px] uppercase tracking-[0.4em] text-stone-900 border-b border-stone-900 pb-1">
                Înapoi la căutare
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RoomsAvailable;
