import { MapPin, Phone, Clock, Mail, Instagram, ExternalLink } from "lucide-react";

export default function Contacts() {
  return (
    <div className="min-h-screen pt-24 pb-16 relative z-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-display font-bold text-white mb-12 text-center">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Cards */}
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-lg flex items-start gap-4 hover:border-primary/50 transition-colors group">
              <div className="p-3 bg-white/5 rounded-full text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white mb-2">Location</h3>
                <p className="text-muted-foreground">Minsk, Internatsionalnaya 33</p>
                <p className="text-sm text-white/40 mt-1">Heart of the city center</p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-lg flex items-start gap-4 hover:border-primary/50 transition-colors group">
              <div className="p-3 bg-white/5 rounded-full text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white mb-2">Phone</h3>
                <p className="text-muted-foreground">+375 29 322-20-40</p>
                <p className="text-sm text-white/40 mt-1">Reservations & Inquiries</p>
              </div>
            </div>

            <div className="glass-panel p-8 rounded-lg flex items-start gap-4 hover:border-primary/50 transition-colors group">
              <div className="p-3 bg-white/5 rounded-full text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-display text-white mb-2">Opening Hours</h3>
                <div className="space-y-1 text-muted-foreground">
                  <p className="flex justify-between gap-8"><span>Sun - Thu</span> <span>12:00 - 00:00</span></p>
                  <p className="flex justify-between gap-8 text-primary font-bold"><span>Fri - Sat</span> <span>12:00 - 02:00</span></p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
               <a 
                 href="https://www.instagram.com/lidbeerlegenda" 
                 target="_blank" 
                 className="flex-1 py-4 border border-white/10 rounded-lg flex items-center justify-center gap-2 hover:bg-primary hover:text-black transition-all group"
               >
                 <Instagram className="w-5 h-5" />
                 <span className="font-bold uppercase text-sm">Follow on Instagram</span>
               </a>
               <a 
                 href="https://eda.yandex.ru/restaurant/lidbeer_bar_legenda" 
                 target="_blank" 
                 className="flex-1 py-4 border border-white/10 rounded-lg flex items-center justify-center gap-2 hover:bg-[#fc0] hover:text-black transition-all group"
               >
                 <ExternalLink className="w-5 h-5" />
                 <span className="font-bold uppercase text-sm">Order Delivery</span>
               </a>
            </div>
          </div>

          {/* Map */}
          <div className="h-[500px] w-full bg-white/5 rounded-lg border border-white/10 overflow-hidden relative">
            <iframe
              src="https://yandex.ru/map-widget/v1/?ll=27.558931%2C53.903889&z=17&pt=27.558931%2C53.903889%2Cpm2rdm"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen={true}
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
