import  { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebaseConfig";

const ReservationsList = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      const q = query(
        collection(db, "reservations"),
        orderBy("createdAt", "desc"),
      );
      const snapshot = await getDocs(q);
      const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setReservations(list);
    } catch (error) {
      console.error("Eroare:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (ts) => {
    if (!ts) return "-";
    const d = ts.toDate ? ts.toDate() : new Date(ts.seconds * 1000);
    return d.toLocaleDateString("ro-RO");
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-stone-400 uppercase text-[10px] tracking-widest">
        Se încarcă...
      </div>
    );

  return (
    <div className="p-8 bg-white border border-stone-100 rounded-sm shadow-sm">
      <h3 className="font-serif text-2xl text-stone-900 mb-8 font-light italic">
        Rezervări <span className="text-stone-400">Primite</span>
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-[10px] uppercase tracking-widest text-stone-400">
              <th className="py-4 font-medium">Cameră</th>
              <th className="py-4 font-medium">Oaspeți</th>
              <th className="py-4 font-medium">Perioadă</th>
              <th className="py-4 font-medium">Client</th>
              <th className="py-4 font-medium">Contact</th>
              <th className="py-4 font-medium text-right">Acțiuni</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {reservations.map((res) => (
              <tr
                key={res.id}
                className="group hover:bg-stone-50/50 transition-colors"
              >
                <td className="py-4 font-serif text-stone-900">{res.roomId}</td>
                <td className="py-4 text-stone-500">
                  {res.guests || res.guest} pers.
                </td>
                <td className="py-4 text-stone-600">
                  <span className="font-medium text-stone-900">
                    {formatDate(res.checkIn)}
                  </span>
                  <span className="mx-2 text-stone-300">—</span>
                  <span className="font-medium text-stone-900">
                    {formatDate(res.checkOut)}
                  </span>
                </td>
                <td className="py-4 font-medium text-stone-900">{res.name}</td>
                <td className="py-4 text-stone-500 text-[12px]">
                  {res.telefon}
                </td>
                <td className="py-4 text-right">
                  <button
                    onClick={() => alert("Funcție limitată în versiunea demo.")}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] uppercase tracking-tighter text-red-400 hover:text-red-600 font-bold"
                  >
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {reservations.length === 0 && (
          <div className="py-20 text-center text-stone-400 italic font-serif">
            Nu există nicio rezervare înregistrată.
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsList;
