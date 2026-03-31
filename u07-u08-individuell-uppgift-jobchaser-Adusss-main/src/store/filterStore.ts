import { create } from "zustand";

type FilterState = {
  text: string;
  location: string;
  category: string;
  employmentType: string;

  setText: (text: string) => void;
  setLocation: (location: string) => void;
  clearFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  text: "",
  location: "",
  category: "",
  employmentType: "",

  setText: (text) => set({ text }),
  setLocation: (location) => set({ location }),

  clearFilters: () =>
    set({
      text: "",
      location: "",
      category: "",
      employmentType: "",
    }),
}));
