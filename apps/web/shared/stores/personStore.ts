import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonState {
  personId: string | null;
  setPersonId: (personId: string) => void;
}

export const usePersonStore = create<PersonState>()(
  persist(
    (set) => ({
      personId: null,
      setPersonId: (personId) => set({ personId })
    }),
    { name: "wyxan-person" }
  )
);
