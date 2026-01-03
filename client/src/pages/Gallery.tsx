import { motion } from "framer-motion";
import heroImg from "@assets/Screenshot_20260103_142659_com_instagram_android_UrlHandlerAct_1767448565467.jpg";
import sandwichImg from "@assets/Screenshot_20260103_142651_com_instagram_android_UrlHandlerAct_1767448565482.jpg";
import saladImg from "@assets/Screenshot_20260103_142542_com_instagram_android_UrlHandlerAct_1767448565611.jpg";
import soupImg from "@assets/Screenshot_20260103_142640_com_instagram_android_UrlHandlerAct_1767448565563.jpg";
import logoImg from "@assets/Screenshot_20260103_162744_com_instagram_android_UrlHandlerAct_1767448565447.jpg";

const images = [
  { src: heroImg, alt: "Bar Interior", span: "md:col-span-2 md:row-span-2" },
  { src: sandwichImg, alt: "Signature Sandwich", span: "md:col-span-1 md:row-span-1" },
  { src: saladImg, alt: "Fresh Salad", span: "md:col-span-1 md:row-span-1" },
  { src: soupImg, alt: "Hot Soup", span: "md:col-span-2 md:row-span-1" },
  { src: logoImg, alt: "Branding", span: "md:col-span-1 md:row-span-1" },
];

export default function Gallery() {
  return (
    <div className="min-h-screen pt-24 pb-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-white mb-4">Gallery</h1>
          <p className="text-muted-foreground">A glimpse into our atmosphere and culinary creations.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px]">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative group overflow-hidden rounded-sm border border-white/5 ${img.span}`}
            >
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" 
              />
              <div className="absolute bottom-0 left-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-white font-bold font-display uppercase tracking-widest text-sm drop-shadow-md">
                    {img.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
