import { useMenu } from "@/hooks/use-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import soupImg from "@assets/Screenshot_20260103_142640_com_instagram_android_UrlHandlerAct_1767448565563.jpg";

const categories = [
  "Холодные закуски",
  "Севиче",
  "Горячие закуски",
  "Салаты",
  "Супы",
  "Горячие блюда",
  "На компанию",
  "Гарниры",
  "Соусы",
  "Десерты"
];

export default function Menu() {
  const { data: menuItems, isLoading, error } = useMenu();
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredItems = menuItems?.filter(item => item.category === activeCategory) || [];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-display">
        Error loading menu. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 relative z-10">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative inline-block"
        >
          <span className="absolute -inset-1 bg-primary/20 blur-xl rounded-full" />
          <h1 className="relative text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tight">
            Our Menu
          </h1>
        </motion.div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Culinary masterpieces crafted with passion and precision.
        </p>
      </div>

      {/* Category Nav */}
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border-b border-white/5 mb-12 py-4">
        <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-6 min-w-max pb-2 md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "text-sm font-bold uppercase tracking-wider transition-all duration-300 py-2 border-b-2 whitespace-nowrap",
                  activeCategory === cat
                    ? "text-primary border-primary"
                    : "text-white/50 border-transparent hover:text-white hover:border-white/20"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 min-h-[50vh]">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map((item, idx) => (
                <div key={item.id} className="group flex flex-col sm:flex-row gap-6 items-start">
                    {/* Optional Image per item if available, or fallback */}
                    {item.imageUrl && (
                        <div className="w-full sm:w-24 h-24 rounded-sm overflow-hidden flex-shrink-0 border border-white/10 group-hover:border-primary/50 transition-colors">
                            <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                    )}
                    
                    <div className="flex-1 w-full">
                        <div className="flex justify-between items-baseline border-b border-dashed border-white/20 pb-2 mb-3">
                            <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">
                                {item.name}
                            </h3>
                            <span className="text-lg font-bold text-primary whitespace-nowrap ml-4">
                                {item.price}
                            </span>
                        </div>
                        {item.description && (
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                {item.description}
                            </p>
                        )}
                    </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-20 text-muted-foreground italic">
                No items in this category yet.
              </div>
            )}
          </motion.div>
        )}
      </div>
      
      {/* Decorative Image Banner at bottom */}
      <div className="container mx-auto px-4 mt-24">
        <div className="relative h-64 rounded-sm overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                <span className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-widest text-center">
                    Taste the <span className="text-primary">Legend</span>
                </span>
            </div>
            <img src={soupImg} alt="Cuisine" className="w-full h-full object-cover opacity-80" />
        </div>
      </div>
    </div>
  );
}
