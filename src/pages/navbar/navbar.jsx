import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

const links = [
  { href: "/", label: "Acasă" },
  { href: "/galery", label: "Galerie" },
  { href: "/restaurant", label: "Restaurant" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-[999] transition-all duration-500 px-6 py-4
        ${scrolled ? "md:top-2" : "md:top-4"}
      `}
    >
      <nav
        className={`
          max-w-7xl mx-auto flex items-center justify-between
          transition-all duration-500 ease-in-out
          ${
            scrolled
              ? "bg-white/80 backdrop-blur-xl border-stone-200/50 shadow-lg py-2.5 px-6 rounded-2xl"
              : "bg-black/10 backdrop-blur-md border-white/10 py-3 px-6 rounded-2xl"
          }
          border
        `}
      >
        <div
          className={`text-[15px] font-bold tracking-tighter cursor-pointer transition-colors
            ${scrolled ? "text-stone-900" : "text-white"}`}
          onClick={() => navigate("/")}
        >
          LA MUNTE{" "}
          <span className="font-light opacity-50 block md:inline md:ml-1 text-[10px] tracking-widest uppercase">
            Pensiune
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {links.map(({ href, label }) => {
            const active = location.pathname === href;
            return (
              <li key={href}>
                <Link
                  to={href}
                  className={`
                    relative block text-[12px] uppercase tracking-[0.15em] px-4 py-2 rounded-xl
                    transition-all duration-300 font-medium
                    ${
                      active
                        ? scrolled
                          ? "text-[#1a3028] bg-stone-100"
                          : "text-white bg-white/20"
                        : scrolled
                          ? "text-stone-500 hover:text-[#1a3028]"
                          : "text-white/70 hover:text-white"
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <button
            className={`md:hidden flex flex-col gap-1.5 p-2 transition-all
              ${scrolled ? "text-stone-900" : "text-white"}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div
              className={`h-0.5 w-6 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <div
              className={`h-0.5 w-6 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`h-0.5 w-6 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        <div
          className={`
            absolute top-full left-0 right-0 mt-3 p-2
            transition-all duration-400 origin-top
            ${menuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
          `}
        >
          <div className="bg-[#1a3028] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                onClick={() => setMenuOpen(false)}
                className="block text-[14px] text-white/90 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
