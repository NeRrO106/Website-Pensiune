import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import imagineaMea from "../../Untitled.jpeg";

const features = [
  { icon: "🏔", title: "Peisaj montan", sub: "Vedere panoramică" },
  { icon: "🧖", title: "SPA & Relaxare", sub: "Saună & masaj" },
  { icon: "🍽", title: "Restaurant", sub: "Bucătărie tradițională" },
  { icon: "⛷", title: "Pârtii de schi", sub: "Acces direct" },
];

const Home = () => {
  const navigate = useNavigate();
  const [numarPersoane, setNumarPersoane] = useState(2);
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d;
  });

  const handleSearch = () => {
    window.scrollTo(0, 0);
    if (endDate <= startDate) {
      setErrorMessage("Selectați o perioadă validă.");
    } else {
      setErrorMessage("");
      navigate("/availablerooms", {
        state: { startDate, endDate, capacity: numarPersoane },
      });
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen font-['DM_Sans']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        
        .react-datepicker-wrapper { width: 100%; }
        .custom-shadow { box-shadow: 0 20px 50px -12px rgba(26, 48, 40, 0.08); }
        .glass-effect { backdrop-filter: blur(8px); background: rgba(255, 255, 255, 0.1); }
      `}</style>

      <section className="relative h-[85vh] flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-[10000ms] hover:scale-110">
          <img
            src={imagineaMea}
            alt="Pensiunea La Munte"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 md:px-16">
          <div className="max-w-2xl">
            <span className="inline-block glass-effect border border-white/30 text-white text-[11px] tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-8 animate-fade-in">
              Escape to Nature · România
            </span>
            <h1 className="text-white font-normal leading-[1.1] mb-6 font-['Playfair_Display'] text-[clamp(40px,7vw,72px)]">
              Refugiul tău <br />
              <span className="italic font-light opacity-90 text-stone-200">
                printre creste
              </span>
            </h1>
            <p className="text-white/80 font-light text-lg leading-relaxed max-w-lg mb-10">
              O experiență de cazare definită prin simplitate, materiale
              naturale și liniște absolută.
            </p>
            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => navigate("/rooms")}
                className="bg-white text-[#1a3028] text-xs font-bold uppercase tracking-widest px-10 py-5 rounded-full hover:bg-[#1a3028] hover:text-white transition-all duration-300 transform hover:-translate-y-1"
              >
                Vezi Camerele Noastre
              </button>
              <button
                onClick={() => navigate("/galery")}
                className="group flex items-center gap-3 text-white text-xs font-bold uppercase tracking-widest px-6 py-5"
              >
                <span className="w-10 h-[1px] bg-white/50 group-hover:w-16 transition-all"></span>
                Galerie Foto
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl custom-shadow p-2 md:p-4">
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1.2fr_1fr_180px] gap-2 items-center">
            <div className="group px-6 py-4 hover:bg-stone-50 rounded-2xl transition-colors cursor-pointer">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-400 font-bold mb-1">
                Check-in
              </label>
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                dateFormat="dd MMM yyyy"
                className="bg-transparent border-none outline-none text-stone-800 font-medium w-full"
              />
            </div>
            <div className="group px-6 py-4 hover:bg-stone-50 rounded-2xl transition-colors cursor-pointer border-l border-stone-100">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-400 font-bold mb-1">
                Check-out
              </label>
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                dateFormat="dd MMM yyyy"
                className="bg-transparent border-none outline-none text-stone-800 font-medium w-full"
              />
            </div>
            <div className="px-6 py-4 border-l border-stone-100">
              <label className="block text-[10px] tracking-[0.2em] uppercase text-stone-400 font-bold mb-1">
                Oaspeți
              </label>
              <div className="flex items-center justify-between mt-1">
                <button
                  onClick={() => setNumarPersoane((p) => Math.max(1, p - 1))}
                  className="text-stone-400 hover:text-[#1a3028] text-xl"
                >
                  −
                </button>
                <span className="text-stone-800 font-medium">
                  {numarPersoane} Pers.
                </span>
                <button
                  onClick={() => setNumarPersoane((p) => p + 1)}
                  className="text-stone-400 hover:text-[#1a3028] text-xl"
                >
                  +
                </button>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={handleSearch}
                className="w-full h-full bg-[#1a3028] text-white text-[13px] font-bold uppercase tracking-wider py-5 rounded-2xl hover:bg-[#2d4a3e] transition-all shadow-lg shadow-[#1a3028]/20"
              >
                Caută
              </button>
            </div>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 text-center text-red-500 text-xs font-medium animate-bounce">
            {errorMessage}
          </div>
        )}
      </div>
      <section className="max-w-7xl mx-auto px-8 py-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map(({ icon, title, sub }) => (
            <div
              key={title}
              className="group flex flex-col items-center text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-white border border-stone-100 flex items-center justify-center text-2xl shadow-sm group-hover:scale-110 group-hover:bg-[#1a3028] group-hover:text-white transition-all duration-500">
                {icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-800 uppercase tracking-widest mb-1">
                  {title}
                </h3>
                <p className="text-xs text-stone-400 font-light italic">
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
