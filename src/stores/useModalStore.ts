import { create } from "zustand";

type State = {
  isOpen: boolean;
  title: string | null;
  content: React.ReactNode | null;
  open: (title: string | null, view: () => React.ReactNode) => void;
  close: () => void;
};

export const useModalStore = create<State>((set) => ({
  isOpen: false,
  title: null,
  content: null,
  open: (title, view) => set({ isOpen: true, title, content: view() }),
  close: () => set({ isOpen: false, content: null }),
}));
