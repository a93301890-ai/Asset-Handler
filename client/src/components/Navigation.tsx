import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Instagram, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import logoImg from "@assets/Screenshot_20260103_162744_com_instagram_android_UrlHandlerAct_1767448565447.jpg";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contacts", href: "/contacts" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-black/80 backdrop-blur-md py-2 border-white/5" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full border border-primary/20 shadow-[0_0_15px_rgba(212,175,55,0.2)] group-hover:border-primary/50 transition-all duration-300">
              <img src={logoImg} alt="Lidbeer Legenda Logo" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold tracking-wider text-white group-hover:text-primary transition-colors">
              LEGENDA
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:text-primary relative group",
                  location === item.href ? "text-primary" : "text-white/80"
                )}
              >
                {item.name}
                <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-[1px] bg-primary transform origin-left transition-transform duration-300",
                    location === item.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            ))}
            
            <a 
              href="https://www.instagram.com/lidbeerlegenda" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/80 hover:text-primary transition-colors"
            >
              <Instagram className="w-5 h-5" />
            </a>

            <Link href="/book">
                <button className="px-6 py-2 bg-primary/10 border border-primary/50 text-primary hover:bg-primary hover:text-black transition-all duration-300 font-display font-bold uppercase tracking-wider text-sm rounded-sm backdrop-blur-sm">
                Book Table
                </button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden transition-all duration-500 flex flex-col items-center justify-center gap-8",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            onClick={() => setIsOpen(false)}
            className="text-2xl font-display font-bold text-white hover:text-primary transition-colors tracking-widest uppercase"
          >
            {item.name}
          </Link>
        ))}
        <Link 
            href="/book" 
            onClick={() => setIsOpen(false)}
            className="mt-4 px-8 py-3 bg-primary text-black font-bold uppercase tracking-wider font-display rounded-sm"
        >
            Book Table
        </Link>

        <div className="flex gap-6 mt-8">
            <a href="https://www.instagram.com/lidbeerlegenda" target="_blank" className="text-white/60 hover:text-primary">
                <Instagram className="w-8 h-8" />
            </a>
            <a href="https://eda.yandex.ru/restaurant/lidbeer_bar_legenda" target="_blank" className="text-white/60 hover:text-primary">
                <ExternalLink className="w-8 h-8" />
            </a>
        </div>
      </div>
    </header>
  );
}
