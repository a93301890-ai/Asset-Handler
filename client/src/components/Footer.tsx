import { Instagram, MapPin, Phone, Clock } from "lucide-react";
import logoImg from "@assets/Screenshot_20260103_162744_com_instagram_android_UrlHandlerAct_1767448565447.jpg";

export function Footer() {
  return (
    <footer className="bg-black/90 border-t border-white/5 py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
               <img src={logoImg} alt="Logo" className="w-10 h-10 rounded-full grayscale opacity-80" />
               <span className="text-2xl font-display font-bold text-white tracking-widest">LEGENDA</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              Where atmosphere meets legendary taste. A unique bar experience in the heart of the city.
            </p>
          </div>

          {/* Info */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Minsk, Internatsionalnaya 33</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <a href="tel:+375291234567" className="text-sm">+375 29 322-20-40</a>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Sun-Thu: 12:00-00:00, Fri-Sat: 12:00-02:00</span>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/50">Follow Us</h4>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/lidbeerlegenda" 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-xs text-white/20">
          <p>© {new Date().getFullYear()} Lidbeer Bar Legenda. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
