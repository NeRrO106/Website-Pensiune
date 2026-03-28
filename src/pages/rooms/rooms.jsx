import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";

const getAllRooms = async () => {
  const roomsRef = collection(db, "rooms");
  const allRoomsSnapshot = await getDocs(roomsRef);
  return allRoomsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (error) {
        console.error("Eroare la încărcare:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllRooms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-px bg-stone-300 animate-expand" />
          <p className="text-[10px] tracking-[0.5em] uppercase text-stone-400">
            Încărcăm liniștea
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-[#FAF9F6] pt-40 pb-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-32">
          <span className="absolute -left-10 -top-10 text-[15rem] font-['Playfair_Display'] text-stone-100 leading-none select-none z-0">
            01
          </span>
          <div className="relative z-10 pl-4 md:pl-20">
            <h4 className="text-[11px] tracking-[0.5em] uppercase text-stone-400 mb-6">
              Arta de a locui
            </h4>
            <h1 className="font-['Playfair_Display'] text-6xl md:text-8xl text-stone-900 leading-[0.9]">
              Sanctuarul <br />
              <span className="italic text-stone-500 pl-20 md:pl-40">
                Tău Personal
              </span>
            </h1>
          </div>
        </div>

        <div className="space-y-40">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12 md:gap-24`}
            >
              <div className="w-full md:w-3/5 relative group">
                <div className="overflow-hidden rounded-sm bg-stone-200 aspect-[16/10] md:aspect-[4/5]">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                  />
                </div>
                <div
                  className={`absolute -bottom-6 ${index % 2 === 0 ? "-right-6" : "-left-6"} bg-stone-900 text-white p-6 hidden md:block`}
                >
                  <p className="text-[10px] tracking-widest uppercase opacity-60 mb-1">
                    Tarif Noapte
                  </p>
                  <p className="text-xl font-['Playfair_Display']">
                    {room.price} RON
                  </p>
                </div>
              </div>
              <div className="w-full md:w-2/5 flex flex-col justify-center">
                <span className="text-[10px] text-stone-400 tracking-[0.3em] uppercase mb-4 italic">
                  Descoperă confortul
                </span>
                <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
                  {room.name}
                </h2>
                <p className="text-stone-500 font-light leading-relaxed mb-8 text-lg">
                  Un spațiu definit prin materiale nobile și o paletă cromatică
                  inspirată din natură, creat special pentru regenerare.
                </p>

                <div className="space-y-3 mb-10 text-stone-600">
                  {room.amenities?.slice(0, 4).map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-xs uppercase tracking-widest"
                    >
                      <span className="w-1 h-1 bg-stone-400 rounded-full" />
                      {item}
                    </div>
                  ))}
                </div>

                <button className="w-fit group relative py-4 pr-12 text-[11px] uppercase tracking-[0.3em] font-bold text-stone-900 overflow-hidden">
                  <span className="relative z-10">Explorează Camera</span>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-px bg-stone-900 transition-all duration-300 group-hover:w-full group-hover:bg-stone-200" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rooms;
