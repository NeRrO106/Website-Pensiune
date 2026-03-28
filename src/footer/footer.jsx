import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0d1310] text-stone-400 font-['DM_Sans']">
      <div className="h-px bg-gradient-to-r from-transparent via-stone-800 to-transparent" />
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-sm font-bold tracking-[0.2em] uppercase mb-6">
              La Munte
            </h3>
            <p className="text-[13px] leading-relaxed font-light opacity-60 max-w-[240px]">
              O experiență autentică în inima munților, unde liniștea întâlnește confortul modern.
            </p>
          </div>
          <div>
            <h4 className="text-stone-200 text-[11px] font-bold tracking-widest uppercase mb-6">Explorează</h4>
            <ul className="space-y-3 text-[13px] font-light">
              <li><Link to="/rooms" className="hover:text-white transition-colors">Camere & Suite</Link></li>
              <li><Link to="/restaurant" className="hover:text-white transition-colors">Restaurant</Link></li>
              <li><Link to="/spa" className="hover:text-white transition-colors">Centru SPA</Link></li>
              <li><Link to="/galery" className="hover:text-white transition-colors">Galerie Foto</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-200 text-[11px] font-bold tracking-widest uppercase mb-6">Contact</h4>
            <ul className="space-y-3 text-[13px] font-light">
              <li className="flex items-center gap-2">
                <span className="opacity-40">A:</span> Str. Principală 123, Bran
              </li>
              <li className="flex items-center gap-2">
                <span className="opacity-40">T:</span> +40 7xx xxx xxx
              </li>
              <li className="flex items-center gap-2">
                <span className="opacity-40">E:</span> contact@pensiunealamunte.ro
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-200 text-[11px] font-bold tracking-widest uppercase mb-6">Urmărește-ne</h4>
            <div className="flex gap-4 mb-6">
              <a href="www.facebook.com" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center hover:bg-white hover:text-[#0d1310] transition-all">
                <span className="text-[10px]">FB</span>
              </a>
              <a href="www.instagram.com" className="w-8 h-8 rounded-full border border-stone-800 flex items-center justify-center hover:bg-white hover:text-[#0d1310] transition-all">
                <span className="text-[10px]">IG</span>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-stone-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] tracking-wider uppercase opacity-40">
            © {currentYear} Pensiunea "La Munte" — Toate drepturile rezervate.
          </div>
          
          <div className="text-[10px] tracking-wider uppercase">
            <span className="opacity-40 text-stone-500">Design de</span>{" "}
            <a
              href="https://siteul-tau.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 font-medium hover:text-white transition-colors"
            >
              Candy Studio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;