import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, ExternalLink } from "lucide-react";
import heroBg from "@assets/Screenshot_20260103_142659_com_instagram_android_UrlHandlerAct_1767448565467.jpg";
import saladImg from "@assets/Screenshot_20260103_142542_com_instagram_android_UrlHandlerAct_1767448565611.jpg";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30 z-10" />
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
            className="w-full h-full"
          >
            <img 
              src={heroBg} 
              alt="Bar Atmosphere" 
              className="w-full h-full object-cover opacity-60" 
            />
          </motion.div>
        </div>

        <div className="container relative z-20 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-primary font-display font-bold tracking-[0.2em] uppercase mb-4 text-sm md:text-base">
              Welcome to the Legend
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-black text-white mb-6 tracking-tighter text-glow leading-none">
              LIDBEER<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary">LEGENDA</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg md:text-xl text-white/80 font-light mb-10 leading-relaxed">
              Experience the perfect blend of legendary atmosphere, exquisite cuisine, and signature craft beers in the heart of Minsk.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/menu">
                <button className="group px-8 py-4 bg-primary text-black font-display font-bold uppercase tracking-widest text-sm hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]">
                  View Menu
                </button>
              </Link>
              <Link href="/book">
                <button className="group px-8 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white font-display font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300">
                  Book a Table
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-sm group"
            >
              <div className="absolute inset-0 border border-primary/20 m-4 z-20 transition-all duration-500 group-hover:m-2 group-hover:border-primary/50" />
              <img src={saladImg} alt="Signature Dish" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col gap-6"
            >
              <h3 className="text-primary uppercase tracking-[0.2em] text-sm font-bold">About Us</h3>
              <h2 className="text-4xl md:text-5xl font-display text-white leading-tight">
                Not Just a Bar,<br />It's a <span className="italic text-primary">Destination</span>
              </h2>
              <div className="w-20 h-1 bg-primary/50" />
              <p className="text-muted-foreground leading-relaxed text-lg">
                Located on Internatsionalnaya 33, Lidbeer Bar Legenda is more than just a place to grab a drink. It's a sanctuary for those who appreciate the finer details. From our carefully curated craft beer selection to our chef's signature dishes, every element is designed to create a memorable experience.
              </p>
              
              <ul className="space-y-4 mt-4">
                {['Premium Craft Beers', 'Signature Cocktails', 'Gourmet Cuisine', 'Live Atmosphere'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/90 font-display">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    <span className="uppercase tracking-wide text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <a 
                href="https://eda.yandex.ru/restaurant/lidbeer_bar_legenda" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mt-6 uppercase tracking-wider font-bold text-sm"
              >
                Order Delivery <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent my-12" />
    </div>
  );
}
