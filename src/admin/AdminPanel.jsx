import React, { useState } from "react";
import RoomsManager from "./RoomManager";
import ReservationsList from "./ReservationList";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("rooms");
  const currentYear = new Date().getFullYear(); 
  return (
    <div className="min-h-screen bg-[#FAF9F6] pt-24 pb-12 px-4 md:px-12 selection:bg-stone-200">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-stone-300"></div>
            <span className="text-[10px] tracking-[0.5em] uppercase text-stone-400 font-medium">
              Sistem de Gestiune
            </span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-stone-900 font-light tracking-tight">
            Panou{" "}
            <span className="italic text-stone-500 underline decoration-stone-200 underline-offset-8">
              Administrator
            </span>
          </h2>
        </header>

        <div className="flex gap-10 border-b border-stone-200 mb-12">
          <button
            className={`pb-5 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 relative group ${
              activeTab === "rooms"
                ? "text-stone-900"
                : "text-stone-400 hover:text-stone-600"
            }`}
            onClick={() => setActiveTab("rooms")}
          >
            <span className="relative z-10">Gestiune Camere</span>
            {activeTab === "rooms" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900 animate-in fade-in slide-in-from-left-2 duration-500" />
            )}
          </button>

          <button
            className={`pb-5 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 relative group ${
              activeTab === "reservations"
                ? "text-stone-900"
                : "text-stone-400 hover:text-stone-600"
            }`}
            onClick={() => setActiveTab("reservations")}
          >
            <span className="relative z-10">Listă Rezervări</span>
            {activeTab === "reservations" && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900 animate-in fade-in slide-in-from-left-2 duration-500" />
            )}
          </button>
        </div>

        <main className="transition-all duration-700 ease-in-out">
          <div className="bg-white border border-stone-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] rounded-sm p-6 md:p-10">
            {activeTab === "rooms" ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                <RoomsManager />
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
                <ReservationsList />
              </div>
            )}
          </div>
        </main>

        <footer className="mt-12 flex justify-between items-center border-t border-stone-100 pt-6">
          <div className="text-[10px] tracking-wider uppercase opacity-40">
            © {currentYear} Pensiunea "La Munte" — Toate drepturile rezervate.
          </div>
          
          <div className="text-[10px] tracking-wider uppercase">
            <span className="opacity-40 text-stone-500">Design de</span>{" "}
            <a
              href="https://siteul-tau.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 font-medium hover:text-black transition-colors"
            >
              Candy Studio
            </a>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            className="text-[9px] uppercase tracking-widest text-stone-900 font-bold border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-colors"
          >
            Înapoi la site
          </button>
        </footer>
      </div>
    </div>
  );
};

export default AdminPanel;
