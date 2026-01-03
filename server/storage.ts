
import { db } from "./db";
import {
  menuItems,
  reservations,
  type MenuItem,
  type InsertMenuItem,
  type InsertReservation,
  type Reservation
} from "@shared/schema";

export interface IStorage {
  getMenuItems(): Promise<MenuItem[]>;
  createMenuItem(item: InsertMenuItem): Promise<MenuItem>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
}

export class DatabaseStorage implements IStorage {
  async getMenuItems(): Promise<MenuItem[]> {
    return await db.select().from(menuItems);
  }

  async createMenuItem(item: InsertMenuItem): Promise<MenuItem> {
    const [newItem] = await db.insert(menuItems).values(item).returning();
    return newItem;
  }

  async createReservation(reservation: InsertReservation): Promise<Reservation> {
    const [newReservation] = await db.insert(reservations).values(reservation).returning();
    return newReservation;
  }
}

export const storage = new DatabaseStorage();
