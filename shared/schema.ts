
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export const menuItems = pgTable("menu_items", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price").notNull(), // Using text to preserve exact formatting like "15,00 р."
  imageUrl: text("image_url"),
});

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guests: integer("guests").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===
export const insertMenuItemSchema = createInsertSchema(menuItems).omit({ id: true });
export const insertReservationSchema = createInsertSchema(reservations).omit({ id: true, createdAt: true });

// === TYPES ===
export type MenuItem = typeof menuItems.$inferSelect;
export type InsertMenuItem = z.infer<typeof insertMenuItemSchema>;

export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = z.infer<typeof insertReservationSchema>;
