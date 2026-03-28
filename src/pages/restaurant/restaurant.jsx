import { useNavigate } from "react-router-dom";

const Restaurant = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0d1310] font-['DM_Sans']">
      <div className="absolute inset-0 opacity-40">
        <img
          src="/images/restaurant-bg.jpg"
          alt="Restaurant Background"
          className="w-full h-full object-cover scale-110 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1310] via-transparent to-[#0d1310]" />
      </div>
      <div className="relative z-10 text-center px-6">
        <span className="inline-block text-[10px] tracking-[0.4em] uppercase text-stone-400 mb-4">
          Experiență Gastronomică
        </span>

        <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl text-white mb-6">
          Gustul <br /> <span className="italic text-stone-300">tradiției</span>
        </h1>

        <div className="w-12 h-px bg-stone-500 mx-auto mb-8" />

        <p className="text-stone-400 font-light text-sm md:text-base max-w-sm mx-auto leading-relaxed mb-10">
          Pregătim un meniu deosebit, bazat pe ingrediente locale și rețete
          uitate. Revenim curând cu detalii savuroase.
        </p>

        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-3 mx-auto text-white text-[11px] uppercase tracking-widest border-b border-white/20 pb-2 hover:border-white transition-all"
        >
          Înapoi la Acasă
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>
      </div>
      <div className="absolute bottom-12 left-12 hidden md:block">
        <p className="text-[9px] text-stone-600 tracking-[0.3em] uppercase vertical-text">
          Coming Winter 2026
        </p>
      </div>
    </div>
  );
};

export default Restaurant;
