import React, { useState } from "react";
import camera1 from "../../img/Deluxe.jpg";
import camera2 from "../../img/family.jpg";
import camera3 from "../../img/dubla.jpg";
import camera4 from "../../img/single.jpg";
import ext1 from "../../img/ext1.jpeg";
import ext2 from "../../img/ext2.jpeg";
import ext3 from "../../img/ext3.jpg";
import ext4 from "../../img/ext4.JPEG";

const images = [
  { src: camera1, alt: "Camera Dublă Deluxe", category: "interior" },
  { src: camera2, alt: "Apartament Family", category: "interior" },
  { src: camera3, alt: "Camera Dublă Standard", category: "interior" },
  { src: camera4, alt: "Camera Single Cozy", category: "interior" },
  { src: ext1, alt: "Terasa de Vară", category: "exterior" },
  { src: ext2, alt: "Vedere Panoramică", category: "exterior" },
  { src: ext3, alt: "Grădina Pensiunii", category: "exterior" },
  { src: ext4, alt: "Fațada Principală", category: "exterior" },
];

const Galery = () => {
  const [filter, setFilter] = useState("toate");

  const filteredImages =
    filter === "toate"
      ? images
      : images.filter((img) => img.category === filter);

  return (
    <section className="min-h-screen bg-[#FAF9F6] pt-32 pb-20 px-6 font-['DM_Sans']">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl text-stone-900 mb-6">
            Galerie <span className="italic">Foto</span>
          </h1>
          <p className="text-stone-500 font-light max-w-lg mx-auto mb-10">
            Fiecare colț al pensiunii noastre este gândit pentru a oferi o stare
            de bine și echilibru.
          </p>
          <div className="flex justify-center gap-8 border-b border-stone-200 w-fit mx-auto pb-2">
            {["toate", "interior", "exterior"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[11px] uppercase tracking-[0.2em] transition-all
                  ${filter === cat ? "text-stone-900 font-bold" : "text-stone-400 hover:text-stone-600"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((item, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl cursor-pointer break-inside-avoid"
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <span className="text-white/60 text-[10px] uppercase tracking-widest mb-1">
                  {item.category}
                </span>
                <p className="text-white text-lg font-['Playfair_Display'] italic">
                  {item.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Galery;
