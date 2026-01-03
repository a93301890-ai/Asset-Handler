import { motion } from "framer-motion";
import { Link } from "wouter";
import { Star, ExternalLink, Globe } from "lucide-react";
import { Scene3D } from "@/components/Scene3D";
import { useLanguage } from "@/hooks/use-language";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-black">
      {/* Language Switcher */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
          className="text-white hover:bg-white/10 flex items-center gap-2 border border-white/20 backdrop-blur-md"
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase">{language === "ru" ? "EN" : "RU"}</span>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* 3D Background */}
        <Scene3D />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60 z-10" />

        <div className="container relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="text-primary font-display font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
              {t("hero.welcome")}
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-black text-white mb-6 tracking-tighter leading-none">
              LIDBEER<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary animate-pulse">
                LEGENDA
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 font-light mb-10 leading-relaxed">
              {t("hero.subtitle")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/menu">
                <button className="group px-10 py-4 bg-primary text-black font-display font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  {t("hero.viewMenu")}
                </button>
              </Link>
              <Link href="/book">
                <button className="group px-10 py-4 border border-white/30 bg-white/5 backdrop-blur-lg text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-500">
                  {t("hero.bookTable")}
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-primary/50"
        >
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-32 relative z-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square overflow-hidden rounded-full border-2 border-primary/20 p-8"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full" />
              <div className="w-full h-full rounded-full border border-primary/40 animate-spin-slow" />
              <div className="absolute inset-16 flex items-center justify-center text-center p-12">
                <div>
                  <h4 className="text-primary font-display text-2xl mb-4 tracking-widest uppercase italic">The Legend</h4>
                  <p className="text-white/60 text-sm uppercase tracking-[0.2em]">{t("footer.address")}</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-8"
            >
              <h3 className="text-primary uppercase tracking-[0.3em] text-sm font-bold">
                {t("about.title")}
              </h3>
              <h2 className="text-5xl md:text-6xl font-display text-white leading-tight">
                {t("about.heading")}
              </h2>
              <div className="w-24 h-1 bg-primary" />
              <p className="text-white/60 leading-relaxed text-xl font-light">
                {t("about.text")}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                {[
                  { key: "about.premium", icon: Star },
                  { key: "about.cocktails", icon: Star },
                  { key: "about.cuisine", icon: Star },
                  { key: "about.atmosphere", icon: Star }
                ].map((item) => (
                  <div key={item.key} className="flex items-center gap-4 text-white/90 p-4 border border-white/10 bg-white/5 rounded-sm hover:border-primary/50 transition-colors">
                    <item.icon className="w-5 h-5 text-primary fill-primary/20" />
                    <span className="uppercase tracking-wider text-sm font-medium">{t(item.key)}</span>
                  </div>
                ))}
              </div>

              <a 
                href="https://eda.yandex.ru/restaurant/lidbeer_bar_legenda" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/5 border border-white/20 text-primary hover:bg-primary hover:text-black transition-all duration-300 uppercase tracking-widest font-bold text-sm mt-8"
              >
                {t("about.delivery")} <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}
