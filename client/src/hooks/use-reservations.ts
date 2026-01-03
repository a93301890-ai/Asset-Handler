import { useMutation } from "@tanstack/react-query";
import { api, type InsertReservation } from "@shared/routes";

export function useCreateReservation() {
  return useMutation({
    mutationFn: async (data: InsertReservation) => {
      const res = await fetch(api.reservations.create.path, {
        method: api.reservations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Invalid data");
        }
        throw new Error("Failed to create reservation");
      }
      return api.reservations.create.responses[201].parse(await res.json());
    },
  });
}
