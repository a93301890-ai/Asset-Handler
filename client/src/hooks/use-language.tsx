import { createContext, useContext, useState, useEffect } from "react";

type Language = "ru" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    "nav.home": "Главная",
    "nav.menu": "Меню",
    "nav.gallery": "Галерея",
    "nav.book": "Бронь",
    "nav.contacts": "Контакты",
    "hero.welcome": "Добро пожаловать в Легенду",
    "hero.title": "LIDBEER LEGENDA",
    "hero.subtitle": "Легендарная атмосфера, крафтовое пиво и изысканная кухня в самом центре Минска.",
    "hero.viewMenu": "Посмотреть меню",
    "hero.bookTable": "Забронировать",
    "about.title": "О нас",
    "about.heading": "Не просто бар, а легендарное место",
    "about.text": "Расположенный на Интернациональной 33, Lidbeer Bar Legenda — это место для тех, кто ценит детали. Отборное крафтовое пиво, авторские блюда и неповторимая атмосфера на трех этажах.",
    "about.premium": "Премиальное крафтовое пиво",
    "about.cocktails": "Авторские коктейли",
    "about.cuisine": "Изысканная кухня",
    "about.atmosphere": "Живая атмосфера",
    "about.delivery": "Заказать доставку",
    "booking.title": "Забронировать стол",
    "booking.name": "Ваше имя",
    "booking.phone": "Телефон",
    "booking.date": "Дата",
    "booking.time": "Время",
    "booking.guests": "Количество гостей",
    "booking.submit": "Забронировать сейчас",
    "booking.success": "Бронирование успешно!",
    "footer.address": "Минск, Интернациональная 33",
    "footer.hours": "Режим работы: 24/7",
    "footer.phone": "+375 29 33-188-33",
  },
  en: {
    "nav.home": "Home",
    "nav.menu": "Menu",
    "nav.gallery": "Gallery",
    "nav.book": "Book",
    "nav.contacts": "Contacts",
    "hero.welcome": "Welcome to the Legend",
    "hero.title": "LIDBEER LEGENDA",
    "hero.subtitle": "Legendary atmosphere, craft beer, and exquisite cuisine in the heart of Minsk.",
    "hero.viewMenu": "View Menu",
    "hero.bookTable": "Book a Table",
    "about.title": "About Us",
    "about.heading": "Not Just a Bar, It's a Destination",
    "about.text": "Located on Internatsionalnaya 33, Lidbeer Bar Legenda is a sanctuary for those who appreciate the finer details. Premium craft beers, signature dishes, and a unique atmosphere across three floors.",
    "about.premium": "Premium Craft Beers",
    "about.cocktails": "Signature Cocktails",
    "about.cuisine": "Gourmet Cuisine",
    "about.atmosphere": "Live Atmosphere",
    "about.delivery": "Order Delivery",
    "booking.title": "Book a Table",
    "booking.name": "Your Name",
    "booking.phone": "Phone",
    "booking.date": "Date",
    "booking.time": "Time",
    "booking.guests": "Number of Guests",
    "booking.submit": "Book Now",
    "booking.success": "Booking Successful!",
    "footer.address": "Minsk, Internatsionalnaya 33",
    "footer.hours": "Open: 24/7",
    "footer.phone": "+375 29 33-188-33",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "ru";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations["ru"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
